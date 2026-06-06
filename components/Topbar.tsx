"use client";

import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { publicNavigation } from "@/lib/platform";
import { ConsultRequestLink } from "./ConsultRequestLink";

const NAV = publicNavigation;
type NavItem = (typeof NAV)[number];

function isHashNavItem(item: NavItem): item is NavItem & { hash: string } {
  return "hash" in item;
}

function isHrefNavItem(item: NavItem): item is NavItem & { href: string } {
  return "href" in item;
}

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const activeId = isHome ? active : null;

  useEffect(() => {
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, (user) => {
      setSignedIn(Boolean(user));
      setAuthReady(true);
    });
  }, []);

  useEffect(() => {
    if (!isHome) {
      return;
    }
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const ids = NAV.filter(isHashNavItem).map((n) => n.hash.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  const navHref = (item: NavItem) => {
    if (isHrefNavItem(item)) return item.href;
    return isHome ? item.hash : `/${item.hash}`;
  };

  const onAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    if (!isHome) {
      router.push(`/${hash}`);
      setOpen(false);
      return;
    }
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    const topbar = document.querySelector(".topbar");
    const offset = topbar ? topbar.getBoundingClientRect().height : 0;
    const top =
      target.getBoundingClientRect().top + window.scrollY - offset + 1;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", hash);
    setOpen(false);
  };

  return (
    <header className="topbar" id="top">
      <div className="topbar__main">
        <Link
          className="brand"
          href="/"
          aria-label="농협지원센터 홈"
          onClick={() => setOpen(false)}
        >
          <span className="brand__logos">
            <span className="brand__logoText brand__logoText--nonghyup">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/prego-logo.svg"
                alt="프리고"
                className="brand__logoImg"
              />
              <span className="brand__wordmark">
                <strong>농협지원센터</strong>
                <small>Powered by Prego</small>
              </span>
            </span>
          </span>
        </Link>

        <nav className="nav" aria-label="주요 메뉴">
          {NAV.map((n) => (
            <a
              key={isHashNavItem(n) ? n.hash : n.href}
              href={navHref(n)}
              className={
                (isHashNavItem(n) && activeId === n.hash.replace("#", "")) ||
                (isHrefNavItem(n) && pathname === n.href)
                  ? "is-active"
                  : undefined
              }
              onClick={(e) => {
                if (isHashNavItem(n)) {
                  onAnchorClick(e, n.hash);
                  return;
                }
                setOpen(false);
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <ConsultRequestLink
          className="cta cta--solid cta--sm"
          onClick={() => setOpen(false)}
          style={{ marginLeft: "12px" }}
        >
          상담·견적 요청
        </ConsultRequestLink>
        {!authReady ? null : signedIn ? (
          <Link className="topbar__auth" href="/mypage" onClick={() => setOpen(false)}>
            마이페이지
          </Link>
        ) : (
          <>
            <Link className="topbar__auth" href="/signup" onClick={() => setOpen(false)}>
              회원가입
            </Link>
            <Link className="topbar__auth" href="/login" onClick={() => setOpen(false)}>
              로그인
            </Link>
          </>
        )}

        <button
          className="menu-btn"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`nav-mobile${open ? " is-open" : ""}`}
        aria-label="모바일 메뉴"
      >
        {NAV.map((n) => (
          <a
            key={isHashNavItem(n) ? n.hash : n.href}
            href={navHref(n)}
            onClick={(e) => {
              if (isHashNavItem(n)) {
                onAnchorClick(e, n.hash);
                return;
              }
              setOpen(false);
            }}
          >
            {n.label}
          </a>
        ))}
        <ConsultRequestLink
          className="nav-mobile__cta"
          onClick={() => setOpen(false)}
        >
          상담·견적 요청
        </ConsultRequestLink>
        {!authReady ? null : signedIn ? (
          <Link
            className="nav-mobile__cta nav-mobile__cta--ghost"
            href="/mypage"
            onClick={() => setOpen(false)}
          >
            마이페이지
          </Link>
        ) : (
          <>
            <Link
              className="nav-mobile__cta nav-mobile__cta--ghost"
              href="/signup"
              onClick={() => setOpen(false)}
            >
              회원가입
            </Link>
            <Link
              className="nav-mobile__cta nav-mobile__cta--ghost"
              href="/login"
              onClick={() => setOpen(false)}
            >
              로그인
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
