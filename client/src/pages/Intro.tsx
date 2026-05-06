import { motion } from "framer-motion";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EmotionStream from "@/components/EmotionStream";
import TrainingChart from "@/components/TrainingChart";
import { useLang } from "@/contexts/LangContext";
import { I18N, pick } from "@/lib/i18n";
import { ArrowRight, Download } from "lucide-react";

// 🔗 "다운로드" 버튼이 가리키는 SEED_Emotion_Analyzer 공개 저장소.
const ANALYZER_REPO_URL = "https://github.com/Link4EEG/SEED_Emotion_Analyzer";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/105236014/ammTayfCoGNfpp6hZJuRgx/hero_eeg_editorial-9Y6qvPDK32AAgcLsfeZBA5.webp";
const PIPELINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/105236014/ammTayfCoGNfpp6hZJuRgx/architecture_pipeline-aVwUFJLarR2UJvBjSUCwa7.webp";
const EMOTIV_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/105236014/ammTayfCoGNfpp6hZJuRgx/topomap_emotiv_32-Mfj5YfmT67GQzzUfENd28h.webp";
const UNICORN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/105236014/ammTayfCoGNfpp6hZJuRgx/topomap_unicorn_8-SnSgxfzxHTE7s2rrEkcHj8.webp";

export default function Intro() {
  const { lang } = useLang();
  const t = I18N.intro;

  const titleWords = lang === "ko" ? t.hero.title_ko : t.hero.title_en;

  return (
    <div className="min-h-screen flex flex-col paper-grain">
      <SiteHeader />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="container pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="section-num mb-6">{pick(lang, t.eyebrow)}</div>
            <h1 className="display-xl text-[56px] md:text-[88px] leading-[0.95]">
              {titleWords.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  {w}
                </motion.span>
              ))}
            </h1>
            <p className="mt-8 max-w-[60ch] text-[17px] leading-[1.7] text-muted-foreground">
              {pick(lang, t.hero.lede)}
            </p>

            {/* 🎯 CTA 영역
                - 1행: [활용 가이드 보기] (filled primary)
                - 2행: [다운로드] (outlined secondary, "활용 가이드 보기" 하단에 위치) → SEED_Emotion_Analyzer repo
                - 3행: 개발 문서(docx) 인라인 링크
                모든 라벨은 pick(lang, ...)을 사용하므로 KO/EN 토글에 즉시 반응한다. */}
            <div className="mt-10 flex flex-col items-start gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/usage"
                      className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 text-sm tracking-tight">
                  {pick(lang, I18N.common.cta.live)}
                  <ArrowRight size={16} />
                </Link>
              </div>

              <a href={ANALYZER_REPO_URL}
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label={pick(lang, I18N.common.cta.download)}
                 className="inline-flex items-center gap-2 border border-foreground text-foreground px-5 py-3 text-sm tracking-tight hover:bg-foreground hover:text-background transition-colors">
                <Download size={16} />
                {pick(lang, I18N.common.cta.download)}
              </a>

              {/* 📄 개발 문서(docx) — client/public/docs/ 에 정적 파일로 배포.
                  import.meta.env.BASE_URL 은 '/'(dev) 또는 '/seed-emotion-platform/'(GitHub Pages)으로
                  치환되어 로컬·배포 환경 모두에서 정상 동작한다. */}
              <a
                href={`${import.meta.env.BASE_URL}docs/Development_Process_KR.docx`}
                download="Development_Process_KR.docx"
                className="link-underline text-sm tracking-tight text-muted-foreground"
              >
                {pick(lang, I18N.common.cta.docs)}
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="relative">
              <img src={HERO_IMG} alt="Editorial EEG illustration"
                   className="w-full h-auto" />
              <div className="absolute -bottom-3 left-0 marginalia">FIG. 02 / EEG TOPOGRAPHY × INFERENCE RIBBONS</div>
            </div>
          </div>
        </div>

        {/* KPI strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 border border-border/60">
          <Kpi value="96.98 %" label={pick(lang, t.kpis.acc)} sub="val_acc · ep10" />
          <Kpi value="32 + 8"  label={pick(lang, t.kpis.ch)}  sub="Emotiv + Unicorn" />
          <Kpi value="1 s"     label={pick(lang, t.kpis.lat)} sub="rolling 10 s window" />
          <Kpi value="1.09 M"  label={pick(lang, t.kpis.params)} sub="CNN(64) + BiLSTM(128)" />
        </div>
      </section>

      <Hairline />

      {/* ============================================================
          02 PIPELINE
          ============================================================ */}
      <section className="container py-20">
        <SectionHead num={pick(lang, t.sec_pipeline.num)}
                     title={pick(lang, t.sec_pipeline.title)}
                     body={pick(lang, t.sec_pipeline.body)} />
        <div className="mt-12">
          <img src={PIPELINE_IMG} alt="Pipeline diagram" className="w-full h-auto" />
        </div>
        <ol className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-px bg-border/60 border border-border/60">
          {t.sec_pipeline.stations.map(s => (
            <li key={s.tag} className="bg-background p-5">
              <div className="meta">{s.tag}</div>
              <div className="mt-1 display text-xl">{pick(lang, s.name)}</div>
              <div className="mt-2 text-[12px] text-muted-foreground leading-relaxed">{pick(lang, s.hint)}</div>
            </li>
          ))}
        </ol>
      </section>

      <Hairline />

      {/* ============================================================
          03 DEVICES
          ============================================================ */}
      <section className="container py-20">
        <SectionHead num={pick(lang, t.sec_devices.num)}
                     title={pick(lang, t.sec_devices.title)}
                     body={pick(lang, t.sec_devices.body)} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <DeviceCard
            name={t.sec_devices.emotiv.name}
            spec={pick(lang, t.sec_devices.emotiv.spec)}
            note={pick(lang, t.sec_devices.emotiv.note)}
            img={EMOTIV_IMG}
            badge="32"
          />
          <DeviceCard
            name={t.sec_devices.unicorn.name}
            spec={pick(lang, t.sec_devices.unicorn.spec)}
            note={pick(lang, t.sec_devices.unicorn.note)}
            img={UNICORN_IMG}
            badge="8"
          />
        </div>
      </section>

      <Hairline />

      {/* ============================================================
          04 RESULTS
          ============================================================ */}
      <section className="container py-20">
        <SectionHead num={pick(lang, t.sec_results.num)}
                     title={pick(lang, t.sec_results.title)}
                     body={pick(lang, t.sec_results.body)} />
        <div className="mt-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <TrainingChart />
          </div>
          <aside className="col-span-12 md:col-span-4 border-l border-border md:pl-6">
            <div className="marginalia">EXPERIMENT</div>
            <ul className="mt-3 space-y-3 text-[13.5px] leading-relaxed text-muted-foreground">
              <Stat k="dataset"  v="SEED · 15 subj × 15 trials" />
              <Stat k="features" v="DE · 5 bands × 62 ch · 1 s" />
              <Stat k="seq"      v="(14 895, 10, 62, 5)" />
              <Stat k="optim"    v="AdamW · cosine LR" />
              <Stat k="loss"     v="cross-entropy" />
              <Stat k="early"    v="ep 10 / 30 · target met" />
              <Stat k="ckpt"     v="cnn_lstm_best.pt · 4.2 MB" highlight />
            </ul>
          </aside>
        </div>
      </section>

      <Hairline />

      {/* ============================================================
          05 OUTPUTS — live mini stream + CSV
          ============================================================ */}
      <section className="container py-20">
        <SectionHead num={pick(lang, t.sec_outputs.num)}
                     title={pick(lang, t.sec_outputs.title)}
                     body={pick(lang, t.sec_outputs.body)} />

        <div className="mt-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7 border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="meta">EMOTION_STREAM · LIVE DEMO</div>
              <div className="marginalia">FIG. 05A</div>
            </div>
            <EmotionStream />
            <div className="mt-3 text-[12px] text-muted-foreground leading-relaxed">
              {pick(lang, t.sec_outputs.plot_caption)}
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <div className="meta">{pick(lang, t.sec_outputs.csv_caption)}</div>
              <div className="marginalia">FIG. 05B</div>
            </div>
            <pre className="text-[11.5px] leading-[1.65] p-5 overflow-x-auto"
                 style={{ fontFamily: "var(--font-mono)" }}>
{`timestamp,device,label,prob_negative,prob_neutral,prob_positive
2026-05-03T11:27:46.163,emotiv ,negative,0.7823,0.2174,0.0003
2026-05-03T11:27:46.413,emotiv ,negative,0.7805,0.2192,0.0003
2026-05-03T11:27:46.663,emotiv ,negative,0.7804,0.2193,0.0003
2026-05-03T11:27:46.913,emotiv ,negative,0.7801,0.2196,0.0003
2026-05-03T11:27:47.163,emotiv ,neutral ,0.4501,0.5121,0.0378
2026-05-03T11:27:47.413,unicorn,positive,0.0612,0.2480,0.6908
2026-05-03T11:27:47.663,unicorn,positive,0.0584,0.2410,0.7006
2026-05-03T11:27:47.913,unicorn,positive,0.0559,0.2381,0.7060
2026-05-03T11:27:48.163,emotiv ,positive,0.0492,0.2270,0.7238
2026-05-03T11:27:48.413,emotiv ,positive,0.0435,0.2194,0.7371
…`}
            </pre>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------- */

function Hairline() { return <div className="hairline container" />; }

function SectionHead({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-3">
        <div className="section-num">FIG. {num}</div>
      </div>
      <div className="col-span-12 md:col-span-9">
        <h2 className="display text-3xl md:text-5xl leading-[1.05]">{title}</h2>
        <p className="mt-5 max-w-[68ch] text-[15.5px] leading-[1.75] text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

function Kpi({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="bg-background p-6">
      <div className="display text-4xl md:text-5xl">{value}</div>
      <div className="mt-1 text-sm">{label}</div>
      <div className="marginalia mt-1">{sub}</div>
    </div>
  );
}

function DeviceCard({
  name, spec, note, img, badge,
}: { name: string; spec: string; note: string; img: string; badge: string }) {
  return (
    <article className="border border-border bg-card">
      <div className="relative bg-background p-6 border-b border-border">
        <img src={img} alt={name} className="w-full max-w-[420px] mx-auto" />
        <div className="absolute top-4 right-4 marginalia">{badge} CH</div>
      </div>
      <div className="p-6">
        <h3 className="display text-2xl">{name}</h3>
        <div className="meta mt-1">{spec}</div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{note}</p>
      </div>
    </article>
  );
}

function Stat({ k, v, highlight = false }: { k: string; v: string; highlight?: boolean }) {
  return (
    <li className="flex items-baseline justify-between gap-4 border-t border-border/60 pt-2">
      <span className="meta">{k}</span>
      <span className={highlight ? "text-foreground" : ""} style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
        {v}
      </span>
    </li>
  );
}
