"use client";

import { useState } from "react";
import {
  defaultServiceCatalog,
  serviceCatalogStorageKey,
  type ServiceCatalogItem,
  type ServiceIconName,
} from "@/lib/platform";

const ICON_OPTIONS: { value: ServiceIconName; label: string }[] = [
  { value: "tax", label: "세무" },
  { value: "ledger", label: "회계" },
  { value: "shield", label: "법률" },
  { value: "control", label: "노무" },
  { value: "structure", label: "등기업무" },
  { value: "valuation", label: "감정평가" },
  { value: "feasibility", label: "지식재산" },
  { value: "subsidy", label: "관세/통관" },
  { value: "audit", label: "감사" },
  { value: "refund", label: "환급" },
  { value: "investigation", label: "검토" },
];

function readSavedCatalog() {
  const saved = window.localStorage.getItem(serviceCatalogStorageKey);
  if (!saved) return defaultServiceCatalog;

  try {
    const parsed = JSON.parse(saved) as ServiceCatalogItem[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultServiceCatalog;
  } catch {
    return defaultServiceCatalog;
  }
}

function createItem(): ServiceCatalogItem {
  return {
    id: `service-${Date.now()}`,
    icon: "tax",
    title: "새 지원분야",
    desc: "관리자에서 문구를 입력해 주세요.",
  };
}

export function ServiceCatalogAdmin() {
  const [items, setItems] = useState<ServiceCatalogItem[]>(() =>
    typeof window === "undefined" ? defaultServiceCatalog : readSavedCatalog()
  );

  const persist = (next: ServiceCatalogItem[]) => {
    setItems(next);
    window.localStorage.setItem(serviceCatalogStorageKey, JSON.stringify(next));
    window.dispatchEvent(new Event("service-catalog-change"));
  };

  const updateItem = <K extends keyof Pick<ServiceCatalogItem, "title" | "desc" | "icon">>(
    id: string,
    key: K,
    value: ServiceCatalogItem[K]
  ) => {
    persist(
      items.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const next = [...items];
    const [current] = next.splice(index, 1);
    next.splice(target, 0, current);
    persist(next);
  };

  const removeItem = (id: string) => {
    persist(items.filter((item) => item.id !== id));
  };

  return (
    <div className="service-admin">
      <div className="service-admin__toolbar">
        <p>
          홈의 지원분야 순서와 문구를 관리합니다. 저장 즉시 같은 브라우저의 홈
          화면에 반영됩니다.
        </p>
        <div className="service-admin__actions">
          <button type="button" className="text-button" onClick={() => persist(defaultServiceCatalog)}>
            기본값 복원
          </button>
          <button type="button" className="cta cta--solid cta--sm" onClick={() => persist([...items, createItem()])}>
            항목 추가
          </button>
        </div>
      </div>

      <ol className="service-admin__list">
        {items.map((item, index) => (
          <li className="service-admin__item" key={item.id}>
            <span className="service-admin__index">{String(index + 1).padStart(2, "0")}</span>
            <label>
              <span>아이콘</span>
              <select
                className="field__input"
                value={item.icon}
                onChange={(event) => updateItem(item.id, "icon", event.target.value as ServiceIconName)}
              >
                {ICON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>제목</span>
              <input
                className="field__input"
                value={item.title}
                onChange={(event) => updateItem(item.id, "title", event.target.value)}
              />
            </label>
            <label className="service-admin__desc">
              <span>설명</span>
              <textarea
                className="field__input field__input--area"
                rows={2}
                value={item.desc}
                onChange={(event) => updateItem(item.id, "desc", event.target.value)}
              />
            </label>
            <div className="service-admin__row-actions">
              <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0}>
                위로
              </button>
              <button type="button" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1}>
                아래로
              </button>
              <button type="button" className="is-danger" onClick={() => removeItem(item.id)}>
                삭제
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
