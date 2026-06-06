"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase/client";

type BoardFilter = "all" | "org" | "mine";

type InquiryBoardAnswer = {
  body: string;
  status: string | null;
  pointCost: number;
  createdAt: string;
};

type InquiryBoardItem = {
  id: string;
  requestNumber?: string;
  subject: string;
  visibility: "public" | "nonghyup" | "private" | string;
  visibilityLabel: string;
  status: string;
  statusLabel: string;
  createdAt: string;
  canReadDetails: boolean;
  isMine: boolean;
  isOrgInquiry: boolean;
  detailNotice: string;
  message: string | null;
  answer: InquiryBoardAnswer | null;
};

type InquiryBoardResponse = {
  ok?: boolean;
  error?: string;
  auth?: "member" | "public";
  items?: InquiryBoardItem[];
};

const PUBLIC_FILTERS: { value: BoardFilter; label: string }[] = [
  { value: "all", label: "전체문의" },
];

const MEMBER_FILTERS: { value: BoardFilter; label: string }[] = [
  { value: "all", label: "전체문의" },
  { value: "org", label: "우리농협문의" },
  { value: "mine", label: "나의문의" },
];

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function visibilityClass(value: string) {
  if (value === "public") return "inquiry-chip--public";
  if (value === "nonghyup") return "inquiry-chip--org";
  return "inquiry-chip--private";
}

function matchesBoardFilter(item: InquiryBoardItem, filter: BoardFilter) {
  if (filter === "mine") return item.isMine;
  if (filter === "org") return item.isOrgInquiry;
  return true;
}

export function InquiryBoard() {
  const [items, setItems] = useState<InquiryBoardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState<"member" | "public">("public");
  const [filter, setFilter] = useState<BoardFilter>("all");
  const [query, setQuery] = useState("");

  const filters = authMode === "member" ? MEMBER_FILTERS : PUBLIC_FILTERS;
  const effectiveFilter = authMode === "public" ? "all" : filter;

  useEffect(() => {
    const auth = getFirebaseAuth();
    const load = async (user: User | null) => {
      setLoading(true);
      setError("");
      try {
        const headers: Record<string, string> = {};
        if (user) {
          headers.authorization = `Bearer ${await user.getIdToken()}`;
        }
        const res = await fetch("/api/inquiries", { headers });
        const data = (await res.json()) as InquiryBoardResponse;
        if (!res.ok || !data.ok) {
          throw new Error(data.error ?? "inquiries_load_failed");
        }
        setItems(data.items ?? []);
        setAuthMode(data.auth ?? "public");
      } catch {
        setError("문의 게시판을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      void load(user);
    });
    return () => unsubscribe();
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesFilter = matchesBoardFilter(item, effectiveFilter);
      const matchesQuery =
        !normalizedQuery ||
        item.subject.toLowerCase().includes(normalizedQuery) ||
        item.requestNumber?.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [effectiveFilter, items, query]);

  const toolbarSummary = useMemo(() => {
    if (effectiveFilter === "org") {
      return "우리 농협에 공유된 문의만 모아 보여드려요.";
    }
    if (effectiveFilter === "mine") {
      return "내가 작성한 문의만 모아 보여드려요.";
    }
    if (authMode === "member") {
      return "선택하신 공개 범위에 맞춰 본문과 답변을 보여드려요.";
    }
    return "전체공개 문의는 로그인 없이 바로 열어볼 수 있어요.";
  }, [authMode, effectiveFilter]);

  return (
    <section className="inquiry-board" aria-label="문의 게시판">
      <div className="inquiry-board__toolbar">
        <div>
          <strong>
            게시판 문의 {filteredItems.length.toLocaleString("ko-KR")}건
          </strong>
          <span>{toolbarSummary}</span>
        </div>
        <label className="inquiry-board__search">
          <span>문의 검색</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="제목 또는 접수번호 검색"
          />
        </label>
      </div>

      <div
        className={`inquiry-board__filters${
          filters.length === 1 ? " inquiry-board__filters--single" : ""
        }`}
        aria-label="문의 목록 필터"
      >
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            className={effectiveFilter === item.value ? "is-active" : undefined}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="inquiry-board__state">문의 목록을 불러오는 중입니다.</div>
      ) : error ? (
        <div className="inquiry-board__state inquiry-board__state--error">
          {error}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="inquiry-board__state">조건에 맞는 문의가 없습니다.</div>
      ) : (
        <div className="inquiry-list">
          {filteredItems.map((item) => (
            <details className="inquiry-row" key={item.id}>
              <summary>
                <span className="inquiry-row__number">
                  {item.requestNumber ?? "접수번호 없음"}
                </span>
                <strong>{item.subject}</strong>
                <span className="inquiry-row__meta">
                  <span className={`inquiry-chip ${visibilityClass(item.visibility)}`}>
                    {item.visibilityLabel}
                  </span>
                  <span className="inquiry-chip inquiry-chip--status">
                    {item.statusLabel}
                  </span>
                  <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
                </span>
              </summary>

              <div className="inquiry-row__detail">
                {item.canReadDetails ? (
                  <>
                    <section>
                      <h3>문의 내용</h3>
                      <p>{item.message}</p>
                    </section>
                    <section>
                      <h3>답변</h3>
                      {item.answer ? (
                        <p>{item.answer.body}</p>
                      ) : (
                        <p className="inquiry-row__muted">
                          아직 등록된 답변이 없습니다.
                        </p>
                      )}
                    </section>
                  </>
                ) : (
                  <div className="inquiry-row__locked">
                    <strong>이 문의는 선택한 공개 범위로 보호되고 있어요.</strong>
                    <p>{item.detailNotice}</p>
                    {authMode === "public" && (
                      <Link href="/login">로그인하고 내용 확인하기</Link>
                    )}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
