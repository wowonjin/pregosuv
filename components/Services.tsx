"use client";
import { useEffect, useState } from "react";
import {
  defaultServiceCatalog,
  serviceCatalogStorageKey,
  type ServiceCatalogItem,
} from "@/lib/platform";
import { ConsultRequestLink } from "./ConsultRequestLink";
import { ServiceIcon } from "./ServiceIcon";

function parseServiceCatalog(value: string | null): ServiceCatalogItem[] {
  if (!value) return defaultServiceCatalog;
  try {
    const parsed = JSON.parse(value) as ServiceCatalogItem[];
    if (!Array.isArray(parsed)) return defaultServiceCatalog;
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.desc === "string" &&
        typeof item.icon === "string"
    );
  } catch {
    return defaultServiceCatalog;
  }
}

export function Services() {
  const [services, setServices] = useState<ServiceCatalogItem[]>(defaultServiceCatalog);

  useEffect(() => {
    const syncServices = () => {
      setServices(parseServiceCatalog(window.localStorage.getItem(serviceCatalogStorageKey)));
    };

    syncServices();
    window.addEventListener("storage", syncServices);
    window.addEventListener("service-catalog-change", syncServices);

    return () => {
      window.removeEventListener("storage", syncServices);
      window.removeEventListener("service-catalog-change", syncServices);
    };
  }, []);

  return (
    <section className="section" id="services">
      <div className="section__head">
        <span className="kicker">Services</span>
        <h2 className="display">
          농협에 필요한 모든 전문 업무를 <em>한 곳에서 시작하세요</em>
        </h2>
        <p className="section__lede">
          세무·회계·법률·노무 등 필요한 분야를 골라, 한 번의 요청으로 상담을
          시작할 수 있습니다.
        </p>
      </div>

      <ol className="services">
        {services.map((s) => (
          <li className="svc" key={s.id}>
            <span className="svc__icon" aria-hidden="true">
              <ServiceIcon name={s.icon} />
            </span>
            <div className="svc__body">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <aside className="bonus">
        <div className="bonus__badge">Policy</div>
        <div className="bonus__body">
          <h3>여러 분야가 섞인 문의도 한 번의 요청으로 시작할 수 있습니다</h3>
        </div>
        <ConsultRequestLink className="bonus__link">
          상담·견적 요청 <span aria-hidden="true">→</span>
        </ConsultRequestLink>
      </aside>
    </section>
  );
}
