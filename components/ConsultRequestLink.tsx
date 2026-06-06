"use client";

import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase/client";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export function ConsultRequestLink({ className, children, onClick, style }: Props) {
  const [href, setHref] = useState("/login");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, (user) => {
      setHref(user ? "/consult" : "/login");
      setReady(true);
    });
  }, []);

  return (
    <Link
      className={className}
      href={href}
      onClick={onClick}
      style={{
        ...style,
        pointerEvents: ready ? undefined : "none",
        opacity: ready ? style?.opacity : 0.72,
      }}
      aria-disabled={!ready}
    >
      {children}
    </Link>
  );
}
