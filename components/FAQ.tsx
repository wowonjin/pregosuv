"use client";

import { useEffect, useMemo, useState } from "react";

type PublicFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const FALLBACK_FAQS: PublicFaq[] = [
  {
    id: "fallback-1",
    question: "농협지원센터가 직접 세무·감사 업무를 수행하나요?",
    answer:
      "농협지원센터는 문의를 접수하고 업무 성격을 확인한 뒤 필요한 상담 또는 견적 절차를 안내하는 플랫폼입니다. 정식 업무는 별도 절차에 따라 진행됩니다.",
    category: "일반",
  },
  {
    id: "fallback-2",
    question: "전문가 연결은 어떻게 진행되나요?",
    answer:
      "문의 내용을 확인한 뒤 업무 성격에 맞는 전문가 상담 또는 견적 절차를 안내합니다. 필요한 자료는 고객 동의 후 전달됩니다.",
    category: "일반",
  },
  {
    id: "fallback-3",
    question: "회원가입할 때 농협은 어떻게 선택하나요?",
    answer:
      "회원가입 단계에서 지역과 농협명을 검색해 소속 농협을 선택합니다. 선택한 농협은 소속 확인 절차 후 마이페이지와 문의 관리에 사용됩니다.",
    category: "회원가입",
  },
  {
    id: "fallback-4",
    question: "포인트는 어디에서 확인하나요?",
    answer:
      "포인트 잔액과 사용 내역은 마이페이지에서 확인할 수 있습니다. 포인트는 플랫폼 내 답변 확인과 사후지원에 사용할 수 있습니다.",
    category: "포인트",
  },
];

export function FAQ() {
  const [faqs, setFaqs] = useState<PublicFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/faqs", { cache: "no-store" });
        const data = (await res.json()) as { ok?: boolean; faqs?: PublicFaq[] };
        if (!cancelled && res.ok && data.ok && data.faqs && data.faqs.length > 0) {
          setFaqs(data.faqs);
          setUsedFallback(false);
          return;
        }
      } catch {
        // fallback below
      }
      if (!cancelled) {
        setFaqs(FALLBACK_FAQS);
        setUsedFallback(true);
      }
    })().finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const items = useMemo(() => faqs, [faqs]);

  return (
    <section className="section" id="faq">
      <div className="section__head">
        <span className="kicker">FAQ</span>
        <h2 className="display">
          자주 받는 <em>질문</em>
        </h2>
        {usedFallback && !loading && (
          <p className="section__lede faq__notice">
            운영자가 등록한 FAQ가 준비 중입니다. 아래는 기본 안내입니다.
          </p>
        )}
      </div>

      {loading ? (
        <p className="faq__loading">FAQ를 불러오는 중입니다.</p>
      ) : (
        <div className="faq">
          {items.map((faq, index) => (
            <details className="faq__item" key={faq.id} open={index === 0}>
              <summary>
                <span className="faq__meta">
                  <span className="faq__category">{faq.category}</span>
                  <span className="faq__q">{faq.question}</span>
                </span>
                <span className="faq__chev" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path
                      d="M5 7 L9 11 L13 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </summary>
              <div className="faq__a">
                {faq.answer.split(/\n+/).map((paragraph, paragraphIndex) => (
                  <p key={`${faq.id}-${paragraphIndex}`}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
