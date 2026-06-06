# 농협지원센터 · 인성회계법인

Next.js 15 (App Router · TypeScript) 기반의 농협지원센터 소개 웹사이트.

## 시작하기

```bash
npm install
npm run dev
```

기본 주소: <http://localhost:3000>

## 스택

- Next.js 15 · React 19 · TypeScript
- 단일 글로벌 CSS (`app/globals.css`)
- Pretendard (한글 본문) · Noto Serif KR · Cormorant Garamond (영문 디스플레이)

## 디렉터리

```
app/
  layout.tsx        루트 레이아웃 (폰트 변수 주입)
  page.tsx          홈 페이지 (섹션 구성)
  globals.css       디자인 토큰 + 모든 스타일
components/
  Topbar.tsx        상단 내비 (스크롤 액티브 트래킹)
  Hero.tsx          타이틀 · CTA · 통계
  Strip.tsx         녹색 강점 띠
  About.tsx         센터/법인 소개 카드
  People.tsx        파트너 회계사 카드
  Services.tsx      11종 업무영역 + Bonus
  Process.tsx       4단계 자문 절차 + 인용
  Contact.tsx       3개 연락 카드 + 신뢰 박스
  Footer.tsx        법인 정보 풋터
```

## 디자인 원칙

- 진녹색(#0F3D2E) + 곡식 옐로(#C8A24B) + 종이 크림 배경의 보수적 팔레트
- 세리프 헤드라인 + Pretendard 본문의 에디토리얼 톤
- 라인/디바이더/넘버링 중심의 잡지형 그리드 (그라디언트 · 글래스모피즘 배제)
- 설명문은 짧게, 메시지는 헤드라인과 여백으로 전달
