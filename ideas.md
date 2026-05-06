# SEED Emotion Platform 쇼케이스 — 디자인 브레인스토밍

## 후보 1 — Editorial Neuro-Lab (선정)

<probability>0.07</probability>

<text>
**Design Movement**: Swiss Editorial × Neuro-Scientific Data Journalism (NYT Magazine, Pitchfork Reviews 의 정보 위계 + Lab notebook 의 절제된 색감).

**Core Principles**
1. *Data is the hero* — 시계열 곡선·확률 막대·뇌 채널 맵을 hero 공간 그 자체로 활용한다. 장식이 아니라 1차 콘텐츠다.
2. *Asymmetric editorial grid* — 12-column 그리드를 사용하되, 본문 칼럼은 6/8, 사이드 메타데이터(시간·정확도·장비)는 3/4 칼럼에 배치하여 잡지 같은 비대칭을 만든다.
3. *Quiet luxury palette* — Off-white(#F4F1EA), Ink(#0F1115), Plasma red(#D24545), Neural green(#3F8F5A), Monitor amber(#E5A24A). 채도를 일부러 낮추고, 데이터 라인에서만 채도를 살린다.
4. *Lab specimen typography* — 본문은 산세리프(Söhne 대체로 Inter Tight), 헤드라인은 세리프 디스플레이(Fraunces). 캡션·메타·코드는 모노(JetBrains Mono).

**Color Philosophy**
연구실 노트와 의료 차트의 신중함을 표현. 정서 분류 결과는 색상에 의미가 강하므로(부정=plasma red, 중립=ink/회색, 긍정=neural green) 의미 색은 데이터 시각화에만 한정하고, UI 크롬은 ink/cream 으로만 구성.

**Layout Paradigm**
- Hero: 좌측 60%는 거대한 세리프 헤드라인 + 한국어/영어 부제 + KPI 카드 3개(96.98%, 32+8 ch, 2 devices). 우측 40%는 모델 추론 결과 시계열 그래프 라이브 미니어처(애니메이션).
- 섹션 사이에는 hairline divider(1px ink/12%) + 섹션 번호(01 ─ 시스템, 02 ─ 데이터 흐름, …).
- 활용 페이지는 좌측 sticky stepper(01 → 06), 우측은 각 단계별 큰 코드/스크린샷 슬레이트.

**Signature Elements**
1. *Spec Sheet Marginalia* — 각 섹션 좌측 또는 우측 여백에 "FIG. 03 / val_acc 0.9698 / Ep10" 같은 회색 메타 텍스트를 monotype 으로 작게 인쇄.
2. *Channel topomap chip* — 32-ch / 8-ch 헤드 토포맵을 인라인 SVG 칩으로 본문 안에 삽입.
3. *Animated emotion ribbon* — 페이지 상단에 1px 두께의 색상 리본이 좌→우로 흘러가며 neg/neu/pos 비율을 표시.

**Interaction Philosophy**
정중하게 반응. hover 시 박스가 들썩이지 않고 underline 만 그려진다. 토글·탭은 ink hairline 이 슬라이드. 데이터 카드는 hover 시 1px ring 만 추가.

**Animation**
- 페이지 진입: 헤드라인은 fontVariationSettings(글자 weight)가 700→500 로 8 frame 전환되며 미세하게 가벼워짐.
- 시계열 그래프: stroke-dashoffset 으로 좌→우 그려짐(1.2s ease-out).
- 토글 전환: 컨테이너 opacity 200ms + 아래에서 위로 4px translate.
- Stepper 활성화: 좌측 번호의 배경이 ink → plasma red 로 250ms.

**Typography System**
- Display: **Fraunces** (Variable, opsz 144, soft serif). H1 80–96px desktop, 48px mobile. Tracking -2%.
- Body: **Inter Tight** 17px / 1.65 줄간. 한글은 **Pretendard Variable** 로 fallback.
- Mono: **JetBrains Mono** 12–14px, marginalia / 코드 / 메타.
</text>

---

## 후보 2 — Synaptic Glassmorphism

<probability>0.04</probability>

<text>
다크 미드나이트 배경 + 보라/시안 글래스 카드 + 형광 시안 그래프. SF·gaming 느낌. SEED 의 학술/의료 톤과 거리가 있어 비채택.
</text>

---

## 후보 3 — Brutalist Lab Manual

<probability>0.03</probability>

<text>
종이 노트 같은 cream 배경 + 굵은 모노 폰트 + 빨간 도장. 흥미롭지만 한/영 토글과 인터랙티브 차트와의 조화가 어렵고 가독성 부담.
</text>

---

## 선정: **Editorial Neuro-Lab**

이 프로젝트는 데이터·논문·실험 기록의 정중한 분위기와 잘 맞고, 한/영 토글이 잡지 마스트헤드의 언어 스위치처럼 자연스럽게 녹아든다.
