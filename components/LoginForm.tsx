"use client";

import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase/client";
import {
  formatKrMobilePhoneInput,
  KR_MOBILE_PHONE_MAX_INPUT_LENGTH,
  normalizeKrMobilePhone,
} from "@/lib/phone";

const ADMIN_EMAIL = "admin@gmail.com";

function getFirebaseMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "이메일 또는 비밀번호가 올바르지 않습니다.";
      case "auth/too-many-requests":
        return "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.";
      case "auth/network-request-failed":
        return "네트워크 연결을 확인한 뒤 다시 시도해 주세요.";
      default:
        return `로그인에 실패했습니다 (${error.code}).`;
    }
  }

  if (error instanceof Error && error.message) {
    if (error.message === "admin_login_failed") {
      return "관리자 비밀번호가 일치하지 않습니다. (관리자 계정: admin@gmail.com / admin)";
    }
    return `로그인 중 문제가 발생했습니다: ${error.message}`;
  }

  return "로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";
}

async function getMemberStatus() {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("missing_current_user");
  const idToken = await user.getIdToken();
  const res = await fetch("/api/me/status", {
    headers: { authorization: `Bearer ${idToken}` },
  });
  const data = (await res.json().catch(() => null)) as {
    ok?: boolean;
    status?: string;
    error?: string;
  } | null;
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error ?? "status_check_failed");
  }
  return data.status;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [findName, setFindName] = useState("");
  const [findPhone, setFindPhone] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [autoLogin, setAutoLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [recoveryStatus, setRecoveryStatus] = useState<
    "idle" | "finding-email" | "resetting-password"
  >("idle");
  const [recoveryMode, setRecoveryMode] = useState<"email" | "password" | null>(
    null
  );
  const [error, setError] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) return setError("이메일을 입력해 주세요.");
    if (!password) return setError("비밀번호를 입력해 주세요.");

    setStatus("submitting");
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    try {
      const auth = getFirebaseAuth();
      await setPersistence(
        auth,
        autoLogin ? browserLocalPersistence : browserSessionPersistence
      );

      if (normalizedEmail === ADMIN_EMAIL) {
        const res = await fetch("/api/auth/admin-login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: normalizedEmail, password: normalizedPassword }),
        });
        let data: { ok?: boolean; token?: string; error?: string } = {};
        try {
          data = (await res.json()) as typeof data;
        } catch {
          throw new Error(`admin-login 응답을 해석하지 못했습니다 (HTTP ${res.status})`);
        }
        if (!res.ok || !data.ok || !data.token) {
          if (data.error === "invalid_credentials") {
            throw new Error("admin_login_failed");
          }
          throw new Error(data.error ?? `admin-login 요청 실패 (HTTP ${res.status})`);
        }
        await signInWithCustomToken(auth, data.token);
        router.push("/admin");
        router.refresh();
        return;
      }

      await signInWithEmailAndPassword(auth, normalizedEmail, password);
      const memberStatus = await getMemberStatus();
      if (memberStatus !== "active") {
        router.push("/pending-approval");
        router.refresh();
        return;
      }
      router.push("/mypage");
      router.refresh();
    } catch (err) {
      setError(getFirebaseMessage(err));
    } finally {
      setStatus("idle");
    }
  };

  const findEmail = async () => {
    setRecoveryMessage(null);
    if (!findName.trim()) {
      setRecoveryMessage({ tone: "error", text: "이름을 입력해 주세요." });
      return;
    }
    if (!findPhone.trim()) {
      setRecoveryMessage({ tone: "error", text: "휴대폰 번호를 입력해 주세요." });
      return;
    }

    setRecoveryStatus("finding-email");
    try {
      const res = await fetch("/api/auth/find-email", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: findName,
          phone: normalizeKrMobilePhone(findPhone),
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        maskedEmail?: string;
        error?: string;
      } | null;
      if (!res.ok || !data?.ok || !data.maskedEmail) {
        throw new Error(data?.error ?? "find_email_failed");
      }
      setRecoveryMessage({
        tone: "success",
        text: `가입 이메일은 ${data.maskedEmail} 입니다.`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setRecoveryMessage({
        tone: "error",
        text:
          message === "invalid_phone"
            ? "휴대폰 번호는 010-0000-0000 형식으로 입력해 주세요."
            : "일치하는 가입 정보를 찾지 못했습니다.",
      });
    } finally {
      setRecoveryStatus("idle");
    }
  };

  const resetPassword = async () => {
    setRecoveryMessage(null);
    const targetEmail = resetEmail.trim().toLowerCase();
    if (!targetEmail) {
      setRecoveryMessage({ tone: "error", text: "이메일을 입력해 주세요." });
      return;
    }

    setRecoveryStatus("resetting-password");
    try {
      await sendPasswordResetEmail(getFirebaseAuth(), targetEmail);
      setRecoveryMessage({
        tone: "success",
        text: "비밀번호 재설정 메일을 발송했습니다. 메일함을 확인해 주세요.",
      });
    } catch (err) {
      setRecoveryMessage({
        tone: "error",
        text:
          err instanceof FirebaseError && err.code === "auth/invalid-email"
            ? "이메일 형식이 올바르지 않습니다."
            : "비밀번호 재설정 메일 발송에 실패했습니다.",
      });
    } finally {
      setRecoveryStatus("idle");
    }
  };

  return (
    <form className="login-form" onSubmit={submit} noValidate>
      <label className="login-form__field">
        <span>이메일</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@email.com"
        />
      </label>

      <label className="login-form__field">
        <span>비밀번호</span>
        <span className="login-form__password">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            aria-pressed={showPassword}
          >
            {showPassword ? "숨김" : "보기"}
          </button>
        </span>
      </label>

      <div className="login-form__meta">
        <label>
          <input
            type="checkbox"
            checked={autoLogin}
            onChange={(event) => setAutoLogin(event.target.checked)}
          />
          <span>자동 로그인</span>
        </label>
        <a href="/signup">회원가입</a>
      </div>

      {error && (
        <p className="login-form__error" role="alert">
          {error}
        </p>
      )}

      <button className="login-form__submit" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "로그인 중..." : "로그인"}
      </button>

      <p className="login-form__hint">
        가입한 농협 이메일 계정으로 로그인해 주세요.
      </p>

      <div className="login-recovery">
        <div className="login-recovery__links" aria-label="계정 찾기">
          <button
            type="button"
            onClick={() => {
              setRecoveryMode((mode) => (mode === "email" ? null : "email"));
              setRecoveryMessage(null);
            }}
          >
            아이디 찾기
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => {
              setRecoveryMode((mode) =>
                mode === "password" ? null : "password"
              );
              setRecoveryMessage(null);
              setResetEmail(email);
            }}
          >
            비밀번호 찾기
          </button>
        </div>

        {recoveryMode === "email" && (
          <div className="login-recovery__panel">
            <label>
              <span>이름</span>
              <input
                value={findName}
                onChange={(event) => setFindName(event.target.value)}
                placeholder="가입자 이름"
              />
            </label>
            <label>
              <span>휴대폰 번호</span>
              <input
                value={findPhone}
                onChange={(event) =>
                  setFindPhone(formatKrMobilePhoneInput(event.target.value))
                }
                inputMode="tel"
                maxLength={KR_MOBILE_PHONE_MAX_INPUT_LENGTH}
                placeholder="010-0000-0000"
              />
            </label>
            <button
              type="button"
              onClick={findEmail}
              disabled={recoveryStatus === "finding-email"}
            >
              {recoveryStatus === "finding-email" ? "확인 중..." : "아이디 확인"}
            </button>
          </div>
        )}

        {recoveryMode === "password" && (
          <div className="login-recovery__panel">
            <label>
              <span>가입 이메일</span>
              <input
                type="email"
                value={resetEmail}
                onChange={(event) => setResetEmail(event.target.value)}
                placeholder="example@email.com"
              />
            </label>
            <button
              type="button"
              onClick={resetPassword}
              disabled={recoveryStatus === "resetting-password"}
            >
              {recoveryStatus === "resetting-password"
                ? "발송 중..."
                : "재설정 메일 발송"}
            </button>
          </div>
        )}

        {recoveryMessage && (
          <p
            className={`login-recovery__message login-recovery__message--${recoveryMessage.tone}`}
            role="status"
          >
            {recoveryMessage.text}
          </p>
        )}
      </div>
    </form>
  );
}
