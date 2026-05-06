/**
 * Bilingual (KO / EN) string table for the SEED Emotion Platform showcase.
 *
 * The website is Korean-first; English is provided as a faithful research
 * report-style translation. Strings are nested by page so that components
 * can reach them with `t.intro.hero.title` etc.
 */

export type Lang = "ko" | "en";

const dict = {
  common: {
    brand: { ko: "SEED Emotion Platform", en: "SEED Emotion Platform" },
    tagline: {
      ko: "EEG · CNN-LSTM · 멀티 디바이스 감정 인식 플랫폼",
      en: "EEG · CNN-LSTM · Multi-Device Emotion Recognition Platform",
    },
    issue: {
      ko: "VOL. 01 — 임상·연구용 시제품",
      en: "VOL. 01 — Research & clinical prototype",
    },
    nav: {
      intro:   { ko: "소개", en: "Overview" },
      usage:   { ko: "활용", en: "Usage" },
      github:  { ko: "코드", en: "Code" },
    },
    cta: {
      live:     { ko: "활용 가이드 보기", en: "Read the usage guide" },
      // 🆕 SEED_Emotion_Analyzer 저장소(릴리스/소스)로 연결되는 다운로드 CTA
      download: { ko: "다운로드", en: "Download" },
      docs:     { ko: "개발 문서 다운로드", en: "Download dev docs" },
      back:     { ko: "← 소개로 돌아가기", en: "← Back to overview" },
    },
    footer: {
      caption: {
        ko: "본 사이트는 Manus AI가 생성한 SEED Emotion Platform 프로젝트의 공개 쇼케이스입니다.",
        en: "This site is a public showcase of the SEED Emotion Platform, prepared by Manus AI.",
      },
      colophon: {
        ko: "Editorial Neuro-Lab 디자인 · Fraunces / Inter Tight / Pretendard / JetBrains Mono",
        en: "Editorial Neuro-Lab design · Fraunces / Inter Tight / Pretendard / JetBrains Mono",
      },
    },
  },

  intro: {
    eyebrow: {
      ko: "FIG. 01 — 시스템 소개",
      en: "FIG. 01 — System overview",
    },
    hero: {
      title_ko: ["뇌파에서", "감정으로,", "한 줄의", "리듬처럼."],
      title_en: ["From neural", "rhythm to", "felt", "emotion."],
      lede: {
        ko: "SEED Emotion Platform은 SJTU SEED 데이터셋으로 학습된 CNN-LSTM 모델을 두 가지 상용 EEG 헤드셋 — Emotiv Flex 2 Saline (32채널) 과 Unicorn Hybrid Black BCI Core-8 (8채널) — 위에서 동시에 운용하는 데스크탑 연구 도구입니다. 1초 단위로 부정·중립·긍정 세 정서를 추정하고, 결과를 CSV와 시계열 그래프로 기록합니다.",
        en: "SEED Emotion Platform is a desktop research tool that runs a CNN-LSTM model — trained on the SJTU SEED dataset — concurrently on two commercial EEG headsets: the 32-channel Emotiv Flex 2 Saline and the 8-channel Unicorn Hybrid Black BCI Core-8. Every second it estimates one of three affective states — negative, neutral, positive — and logs the result as both a CSV trace and a time-series plot.",
      },
    },
    kpis: {
      acc: { ko: "검증 정확도", en: "Validation accuracy" },
      ch:  { ko: "지원 채널", en: "Channel coverage" },
      lat: { ko: "추론 주기", en: "Inference cadence" },
      params: { ko: "모델 파라미터", en: "Model parameters" },
    },
    sec_pipeline: {
      num: { ko: "02", en: "02" },
      title: { ko: "신호에서 감정으로 — 5단계 파이프라인", en: "From signal to feeling — a five-stage pipeline" },
      body: {
        ko: "원시 EEG는 0.3–50 Hz 대역통과를 거쳐 200 Hz로 공통 리샘플링되고, Welch PSD 기반의 5대역(δ/θ/α/β/γ) 미분 엔트로피(DE) 특징으로 변환됩니다. 8 또는 32채널 신호는 SEED 62채널 토포그래피로 zero-pad 매핑된 뒤 10초 길이의 시퀀스로 묶여 공유 2D-CNN과 양방향 LSTM에 입력됩니다.",
        en: "Raw EEG is band-passed at 0.3–50 Hz and resampled to a common 200 Hz, then transformed into Welch-based differential-entropy (DE) features across five bands (δ/θ/α/β/γ). The 8- or 32-channel signal is zero-padded into the SEED 62-channel topography, packed into 10-second sequences, and fed to a shared 2D-CNN followed by a bidirectional LSTM.",
      },
      stations: [
        { tag: "01", name: { ko: "수집", en: "Acquisition" }, hint: { ko: "Emotiv Cortex / Unicorn LSL · 256·250 Hz", en: "Emotiv Cortex / Unicorn LSL · 256·250 Hz" } },
        { tag: "02", name: { ko: "전처리", en: "Pre-process" }, hint: { ko: "0.3–50 Hz BPF · 200 Hz 리샘플", en: "0.3–50 Hz BPF · 200 Hz resample" } },
        { tag: "03", name: { ko: "특징", en: "Features" }, hint: { ko: "Welch PSD · 5-band DE", en: "Welch PSD · 5-band DE" } },
        { tag: "04", name: { ko: "추론", en: "Inference" }, hint: { ko: "CNN(32→64) + BiLSTM(128)", en: "CNN(32→64) + BiLSTM(128)" } },
        { tag: "05", name: { ko: "출력", en: "Output" }, hint: { ko: "P(neg / neu / pos) → CSV · PNG", en: "P(neg / neu / pos) → CSV · PNG" } },
      ],
    },
    sec_devices: {
      num: { ko: "03", en: "03" },
      title: { ko: "두 장비, 하나의 모델", en: "Two headsets, one model" },
      body: {
        ko: "두 헤드셋은 채널 수와 전극 위치, 샘플링 레이트가 다릅니다. 추론 엔진은 각 장비의 채널 인덱스를 SEED 62채널 좌표계의 해당 위치에 0-padding으로 매핑한 뒤, 학습 시점의 정규화 통계를 동일하게 적용해 모델 가중치를 공유합니다. 이로써 임상 등급 32채널 캡과 보급형 8채널 캡 모두에서 일관된 정서 라벨을 얻을 수 있습니다.",
        en: "The two headsets differ in electrode count, location and sample rate. The inference engine zero-pads each device's channels into the SEED 62-channel coordinate frame and re-uses the training-time normalisation, so a single set of model weights serves both the clinical-grade 32-channel cap and the consumer-grade 8-channel cap.",
      },
      emotiv: {
        name: "Emotiv Flex 2 Saline",
        spec: { ko: "32 채널 · 256 Hz · 식염수 전극", en: "32 channels · 256 Hz · saline electrodes" },
        note: { ko: "SEED 62채널 중 28개 정확 일치, 4개(FT9·FT10·TP9·TP10) 인접 대체.", en: "28 channels match SEED exactly; 4 (FT9·FT10·TP9·TP10) substituted by neighbours." },
      },
      unicorn: {
        name: "Unicorn Hybrid Black BCI Core-8",
        spec: { ko: "8 채널 · 250 Hz · Hybrid 전극", en: "8 channels · 250 Hz · hybrid electrodes" },
        note: { ko: "Fz·C3·Cz·C4·Pz·PO7·Oz·PO8 — 정중·후두 라인을 우선 커버.", en: "Fz·C3·Cz·C4·Pz·PO7·Oz·PO8 — covers the midline and occipital ridge." },
      },
    },
    sec_results: {
      num: { ko: "04", en: "04" },
      title: { ko: "학습 결과 — 96.98 %", en: "Training result — 96.98 %" },
      body: {
        ko: "모델은 14,895개의 시퀀스 텐서(10초 × 62채널 × 5대역)로 80/20 stratified 학습되었습니다. AdamW 옵티마이저(lr 1e-3, wd 1e-4) 와 Cosine LR 스케줄을 사용해 epoch 5에서 90 %를 통과하고, epoch 10에서 검증 정확도 0.9698 으로 early-stop 되었습니다.",
        en: "The model was trained on 14,895 sequence tensors (10 s × 62 ch × 5 bands) with an 80/20 stratified split. Using AdamW (lr 1e-3, wd 1e-4) and a cosine LR schedule, validation accuracy crossed 90 % at epoch 5 and reached 0.9698 at epoch 10, where training was early-stopped.",
      },
      table_caption: { ko: "Epoch별 학습 추이 (요약)", en: "Per-epoch training summary" },
      legend: {
        train: { ko: "학습", en: "train" },
        val:   { ko: "검증", en: "val" },
        target:{ ko: "목표 90 %", en: "target 90 %" },
      },
    },
    sec_outputs: {
      num: { ko: "05", en: "05" },
      title: { ko: "결과물 — CSV 와 시계열 그래프", en: "Outputs — CSV and time-series plots" },
      body: {
        ko: "녹화 세션이 끝나면 두 가지 파일이 함께 저장됩니다. 첫째, 1초 단위의 정서 확률을 담은 CSV. 둘째, 동일 구간에 대한 시계열 PNG 그래프. 두 파일 모두 timestamp · device · label · prob_negative · prob_neutral · prob_positive 형식으로 정렬되어 후속 통계 분석에 곧장 사용할 수 있습니다.",
        en: "When a recording session ends, two artefacts are written together: a one-second resolution CSV of class probabilities and a matching PNG time-series plot. Both follow the same schema — timestamp · device · label · prob_negative · prob_neutral · prob_positive — and are ready for downstream statistical analysis.",
      },
      csv_caption: { ko: "emotion_timeseries_<ts>.csv (예시)", en: "emotion_timeseries_<ts>.csv (example)" },
      plot_caption: { ko: "60 초 합성 검증 — Emotiv (위) · Unicorn (아래)", en: "60 s synthetic check — Emotiv (top) · Unicorn (bottom)" },
    },
  },

  usage: {
    eyebrow: { ko: "FIG. 06 — 활용 가이드", en: "FIG. 06 — Usage guide" },
    title: {
      ko: ["여섯 단계로 끝나는", "감정 기록 세션."],
      en: ["A complete emotion-logging", "session in six steps."],
    },
    lede: {
      ko: "아래 단계는 Mock 모드를 포함해 실제 하드웨어 없이도 그대로 따라할 수 있습니다. 실제 장비를 사용할 때는 각 단계 우측의 'Live' 메모를 참고하세요.",
      en: "The steps below work end-to-end in mock mode, without any hardware. When real headsets are attached, follow the 'Live' notes on the right of each step.",
    },
    // 🎬 STEPS 직전(01 환경 준비 위)에 임베드되는 설치/실행 영상.
    video: {
      eyebrow: { ko: "FIG. 06.00 — VIDEO WALKTHROUGH",       en: "FIG. 06.00 — VIDEO WALKTHROUGH" },
      title:   { ko: "프로그램 설치 및 실행 방법",            en: "How to install & run the program" },
      caption: {
        ko: "전체 과정을 영상으로 먼저 훑어보고, 아래 6단계를 따라 진행하세요.",
        en: "Watch the full walkthrough first, then follow the six steps below.",
      },
    },
    steps: [
      {
        no: "01",
        title: { ko: "환경 준비", en: "Set up the environment" },
        body: {
          ko: "Python 3.11 환경에서 PyTorch · pyqtgraph · PyQt6 등을 설치합니다. 학습된 체크포인트(checkpoints/cnn_lstm_best.pt) 와 정규화 통계(norm_stats.npz) 가 같은 폴더에 있어야 합니다.",
          en: "On a Python 3.11 environment install PyTorch, pyqtgraph and PyQt6. Make sure the trained checkpoint (checkpoints/cnn_lstm_best.pt) and the normalisation statistics (norm_stats.npz) live in the same folder.",
        },
        code: "cd seed_project/ui\npip install -r requirements.txt",
        live: { ko: "Live: macOS / Windows 모두 검증.", en: "Live: tested on macOS and Windows." },
      },
      {
        no: "02",
        title: { ko: "Mock 모드로 UI 실행", en: "Launch the UI in mock mode" },
        body: {
          ko: "하드웨어 없이 합성 신호로 전체 파이프라인을 검증할 수 있습니다. 메인 윈도우의 5개 탭이 어떻게 동작하는지 먼저 익혀두세요.",
          en: "Validate the whole pipeline against synthetic signal without any hardware. Use this run to learn the layout of the five tabs in the main window.",
        },
        code: "python main_app.py --mock",
        live: { ko: "Live: --mock 플래그를 빼면 실제 장비를 탐색합니다.", en: "Live: drop --mock to scan for real devices." },
      },
      {
        no: "03",
        title: { ko: "장비 연결", en: "Connect the headsets" },
        body: {
          ko: "Device Manager 탭에서 두 장비 모두 'Connect' 버튼을 누르면, Emotiv는 Cortex API(WebSocket JSON-RPC), Unicorn은 LSL 또는 UnicornPy로 자동 연결을 시도합니다. 한 장비만 연결해도 정상 동작합니다.",
          en: "From the Device Manager tab press 'Connect' on both rows. Emotiv connects through the Cortex API (WebSocket JSON-RPC); Unicorn through LSL or UnicornPy. The platform also runs happily with a single headset.",
        },
        code: "Device Manager → [Connect Emotiv]\n              → [Connect Unicorn]",
        live: { ko: "Live: Emotiv 앱이 백그라운드에서 실행 중이어야 합니다.", en: "Live: the Emotiv app must be running in the background." },
      },
      {
        no: "04",
        title: { ko: "라이브 EEG 확인", en: "Inspect the live EEG" },
        body: {
          ko: "Live EEG 탭에서 두 장비의 5초 윈도우가 위·아래로 누적됩니다. 채널마다 80 µV 간격으로 오프셋되어 있어 잡음 채널을 즉시 식별할 수 있습니다.",
          en: "The Live EEG tab stacks each device's 5-second window in two pyqtgraph panes. Channels are offset by 80 µV so that noisy electrodes are easy to spot at a glance.",
        },
        code: "Live EEG (top)    → Emotiv 32 ch\nLive EEG (bottom) → Unicorn 8 ch",
        live: { ko: "Live: 잡음 채널은 Settings 탭에서 임시 제외할 수 있습니다.", en: "Live: noisy channels can be muted from the Settings tab." },
      },
      {
        no: "05",
        title: { ko: "감정 모니터", en: "Watch the Emotion Monitor" },
        body: {
          ko: "1초마다 부정·중립·긍정 확률이 갱신되고, 화면 하단의 컬러 밴드는 argmax 라벨의 흐름을 색으로 보여줍니다. 두 장비가 모두 연결되어 있으면 평균 확률을 사용합니다.",
          en: "Every second the negative / neutral / positive probabilities are refreshed; a coloured band beneath the chart traces the argmax label over time. When both headsets are connected the platform uses their averaged probabilities.",
        },
        code: "Emotion Monitor → P(neg / neu / pos)  + label band",
        live: { ko: "Live: 라벨 변경 시 화면이 빨강·회색·녹색으로 미세하게 깜빡입니다.", en: "Live: the dominant colour briefly flashes when a label flips." },
      },
      {
        no: "06",
        title: { ko: "녹화 · 내보내기", en: "Record & export" },
        body: {
          ko: "Recording 탭에서 출력 폴더를 선택한 뒤 ● Start 를 누르면 raw EEG CSV 와 emotion_timeseries CSV 가 동시에 기록됩니다. ■ Stop 시 동일 구간의 시계열 그래프 PNG 가 함께 저장됩니다.",
          en: "From the Recording tab choose an output folder and press ● Start. Two CSVs are produced (raw EEG and emotion_timeseries); on ■ Stop the matching time-series PNG is rendered alongside them.",
        },
        code: "output/\n├── eeg_raw_emotiv_<ts>.csv\n├── eeg_raw_unicorn_<ts>.csv\n├── emotion_timeseries_<ts>.csv\n└── emotion_timeseries_<ts>.png",
        live: { ko: "Live: 24시간 연속 녹화 부하 테스트 통과.", en: "Live: 24-hour continuous recording stress-test passed." },
      },
    ],
    interpretation: {
      num: { ko: "07", en: "07" },
      title: { ko: "결과 해석 가이드", en: "Reading the output" },
      rows: [
        {
          col: { ko: "label", en: "label" },
          desc: { ko: "argmax 클래스 — negative / neutral / positive", en: "argmax class — negative / neutral / positive" },
        },
        {
          col: { ko: "prob_*", en: "prob_*" },
          desc: { ko: "0–1 범위의 확률. 합은 1.", en: "Probability in [0, 1]; values sum to 1." },
        },
        {
          col: { ko: "device", en: "device" },
          desc: { ko: "emotiv · unicorn · emotiv+unicorn (평균)", en: "emotiv · unicorn · emotiv+unicorn (averaged)" },
        },
        {
          col: { ko: "timestamp", en: "timestamp" },
          desc: { ko: "ISO 8601 (밀리초). 두 CSV 가 동일 시계열로 정렬됨.", en: "ISO 8601 with milliseconds; both CSVs share the same timeline." },
        },
      ],
    },
    notes: {
      num: { ko: "08", en: "08" },
      title: { ko: "운영 메모", en: "Operational notes" },
      items: [
        { ko: "두 장비의 샘플링 레이트(256·250 Hz)는 추론 단계에서 200 Hz로 공통 리샘플링됩니다.", en: "Both headsets are resampled to a common 200 Hz before inference." },
        { ko: "임피던스가 50 kΩ 을 넘는 채널은 결과의 신뢰도를 낮추므로 식염수를 보충하세요.", en: "Channels above 50 kΩ degrade reliability — top up the saline." },
        { ko: "감정 라벨은 1초 단위 점추정입니다. 트렌드 해석은 30초 이상 누적해서 보세요.", en: "Labels are 1-second point estimates; interpret trends over windows ≥ 30 s." },
      ],
    },
  },
} as const;

/* ----------------------------------------------------------------------------
   tiny helpers
   ---------------------------------------------------------------------------- */
export type Bilingual = { ko: string; en: string };

export function pick(lang: Lang, x: Bilingual | string): string {
  if (typeof x === "string") return x;
  return x[lang];
}

export const I18N = dict;
