# SEED Emotion Platform — Showcase

EEG 기반 감정 분류 모델(SEED Dataset · CNN-LSTM)의 학술/저널 톤 인터랙티브 쇼케이스 사이트입니다.
An editorial, magazine-style interactive showcase for an EEG-based emotion classification model
trained on the **SEED Dataset** with a **CNN-LSTM** architecture.

🌐 **Live demo:** https://link4eeg.github.io/seed-emotion-platform/

---

## ✨ 무엇을 보여주나요? / What this site shows

- **시스템 개요** — 32-ch (DEAP-style) 및 8-ch (Emotiv EPOC FLEX-style) EEG 입력에서
  부정·중립·긍정(neg/neu/pos) 3-class 감정을 분류하는 파이프라인.
- **학습 결과** — `val_acc 96.98%` (Ep10) 학습/검증 곡선 및 채널별 토포맵 시각화.
- **활용 가이드** — 6 단계 stepper 로 데이터 준비 → 전처리 → 모델 추론 → 결과 해석
  까지 한 페이지에서 따라갈 수 있도록 정리.
- **한/영 토글** — `LangContext` 기반의 i18n 으로 모든 카피를 한국어/영어 동시 지원.

> 디자인 컨셉의 자세한 내용은 [`ideas.md`](./ideas.md) 의 _Editorial Neuro-Lab_
> 항목을 참고하세요. (Swiss Editorial × Neuro-Scientific Data Journalism)

## 🛠 기술 스택 / Tech stack

| 레이어 | 사용 기술 |
| --- | --- |
| Frontend | React 19, Vite 7, TypeScript 5.6 |
| 라우팅 | wouter (base-path-aware) |
| 스타일 | Tailwind CSS 4 + Radix UI + shadcn/ui |
| 차트/모션 | Recharts, Framer Motion |
| 폰트 | Fraunces / Inter Tight / JetBrains Mono / Pretendard |
| 호스팅 | GitHub Pages (Actions 자동 배포) |

## 🚀 로컬 실행 / Run locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## 🏗 빌드 / Build

```bash
# 일반 빌드 (server bundle 포함)
pnpm build

# GitHub Pages 용 정적 빌드 (base path + 404.html SPA fallback)
VITE_BASE_PATH=/seed-emotion-platform/ pnpm build:pages
```

## 🚢 배포 / Deployment

`main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 가
1. pnpm install
2. `vite build` (with `VITE_BASE_PATH=/seed-emotion-platform/`)
3. `dist/public` 을 GitHub Pages 로 업로드

순서로 자동 실행합니다.

## 📁 프로젝트 구조 / Layout

```
seed_emotion_site/
├── client/              # 프론트엔드 (Vite root)
│   ├── index.html
│   └── src/
│       ├── pages/       # Intro, Usage, NotFound
│       ├── components/  # EmotionStream, TrainingChart, …
│       ├── contexts/    # ThemeContext, LangContext
│       └── App.tsx
├── server/              # Express SSR/API (정적 호스팅에서는 미사용)
├── shared/              # 공용 상수
├── .github/workflows/   # GitHub Pages 배포 워크플로우
└── vite.config.ts
```

## 📜 라이선스 / License

MIT
