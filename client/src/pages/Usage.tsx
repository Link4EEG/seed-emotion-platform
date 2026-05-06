import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/contexts/LangContext";
import { I18N, pick } from "@/lib/i18n";
import { ArrowUpRight, Terminal } from "lucide-react";

export default function Usage() {
  const { lang } = useLang();
  const t = I18N.usage;
  const titleWords = lang === "ko" ? t.title.ko : t.title.en;

  const [active, setActive] = useState(0);

  // simple scroll-spy on the step anchors
  useEffect(() => {
    function onScroll() {
      const els = t.steps.map((_, i) => document.getElementById(`step-${i}`));
      const tops = els.map(e => (e ? e.getBoundingClientRect().top : Infinity));
      // pick the one closest to (just above) 30 % of viewport
      const target = window.innerHeight * 0.30;
      let bestIdx = 0;
      let bestDelta = Infinity;
      tops.forEach((y, i) => {
        const d = Math.abs(y - target);
        if (y < window.innerHeight * 0.7 && d < bestDelta) {
          bestDelta = d;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [t.steps]);

  return (
    <div className="min-h-screen flex flex-col paper-grain">
      <SiteHeader />

      {/* HERO ----------------------------------------------------------- */}
      <section className="container pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-9">
            <div className="section-num mb-6">{pick(lang, t.eyebrow)}</div>
            <h1 className="display-xl text-[44px] md:text-[80px] leading-[0.98]">
              {titleWords.map((w, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="block">{w}</motion.span>
              ))}
            </h1>
            <p className="mt-7 max-w-[64ch] text-[16px] leading-[1.7] text-muted-foreground">
              {pick(lang, t.lede)}
            </p>
          </div>

          <div className="col-span-12 md:col-span-3 md:text-right">
            <Link href="/" className="link-underline meta">
              {pick(lang, I18N.common.cta.back)}
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          🎬 VIDEO WALKTHROUGH — 01 환경 준비 직전에 노출되는 설치/실행 영상.
          제목·설명은 i18n(t.video.*)으로 KO/EN 토글에 자동 반응한다.
          유튜브 임베드는 lite 옵션(rel=0, modestbranding=1)으로 배너 노이즈를 줄인다.
          ============================================================ */}
      <section className="container pb-16 md:pb-24">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <div className="section-num">{pick(lang, t.video.eyebrow)}</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display text-3xl md:text-4xl leading-tight">
              {pick(lang, t.video.title)}
            </h2>
            <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.7] text-muted-foreground">
              {pick(lang, t.video.caption)}
            </p>

            <div className="mt-8 border border-border bg-card overflow-hidden">
              <div
                className="relative w-full"
                style={{ aspectRatio: "16 / 9" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/oR6daxHShoE?rel=0&modestbranding=1"
                  title={pick(lang, t.video.title)}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <div className="px-4 py-2 border-t border-border flex items-center justify-between">
                <span className="marginalia text-muted-foreground">YOUTUBE · oR6daxHShoE</span>
                <a
                  href="https://youtu.be/oR6daxHShoE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline marginalia"
                >
                  youtu.be ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Hairline />

      {/* STEPS ---------------------------------------------------------- */}
      <section className="container pt-16 pb-24 md:pt-20">
        <div className="grid grid-cols-12 gap-10">
          {/* sticky stepper */}
          <aside className="hidden md:block col-span-3">
            <div className="sticky top-32">
              <div className="section-num mb-4">SESSION FLOW</div>
              <ol className="space-y-3">
                {t.steps.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.no}>
                      <a href={`#step-${i}`}
                         className={`flex items-baseline gap-3 transition-colors ${on ? "text-foreground" : "text-muted-foreground"}`}>
                        <span className={`marginalia inline-block w-8 ${on ? "text-[var(--neg)]" : ""}`}>{s.no}</span>
                        <span className="text-[14px] leading-snug">{pick(lang, s.title)}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </aside>

          {/* steps */}
          <div className="col-span-12 md:col-span-9 space-y-20">
            {t.steps.map((s, i) => (
              <article key={s.no} id={`step-${i}`} className="scroll-mt-32">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-7">
                    <div className="flex items-baseline gap-4">
                      <span className="display text-5xl md:text-6xl tabular-nums">{s.no}</span>
                      <h2 className="display text-2xl md:text-3xl leading-tight pt-2">{pick(lang, s.title)}</h2>
                    </div>
                    <p className="mt-5 text-[15.5px] leading-[1.75] text-muted-foreground">
                      {pick(lang, s.body)}
                    </p>
                  </div>

                  <aside className="col-span-12 md:col-span-5">
                    <div className="bg-foreground text-background overflow-hidden border border-foreground">
                      <div className="px-4 py-2 border-b border-background/15 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal size={14} />
                          <span className="marginalia text-background/70">SHELL · UI</span>
                        </div>
                        <span className="marginalia text-background/50">FIG. 06.{s.no}</span>
                      </div>
                      <pre className="text-[12.5px] leading-[1.7] p-4 whitespace-pre-wrap"
                           style={{ fontFamily: "var(--font-mono)" }}>{s.code}</pre>
                    </div>
                    <div className="mt-3 flex items-start gap-2 text-[12.5px] text-muted-foreground">
                      <ArrowUpRight size={14} className="mt-0.5 shrink-0" />
                      <span>{pick(lang, s.live)}</span>
                    </div>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Hairline />

      {/* INTERPRETATION TABLE ------------------------------------------- */}
      <section className="container py-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <div className="section-num">FIG. {pick(lang, t.interpretation.num)}</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display text-3xl md:text-4xl">{pick(lang, t.interpretation.title)}</h2>
            <table className="mt-8 w-full text-[14.5px] border-t border-border">
              <thead>
                <tr className="text-left">
                  <th className="py-3 w-1/3 marginalia font-normal">column</th>
                  <th className="py-3 marginalia font-normal">{lang === "ko" ? "설명" : "description"}</th>
                </tr>
              </thead>
              <tbody>
                {t.interpretation.rows.map(r => (
                  <tr key={pick(lang, r.col)} className="border-t border-border/70 align-top">
                    <td className="py-4 pr-6"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--neg)" }}>
                      {pick(lang, r.col)}
                    </td>
                    <td className="py-4 text-muted-foreground leading-relaxed">{pick(lang, r.desc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Hairline />

      {/* OPERATIONAL NOTES --------------------------------------------- */}
      <section className="container py-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <div className="section-num">FIG. {pick(lang, t.notes.num)}</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display text-3xl md:text-4xl">{pick(lang, t.notes.title)}</h2>
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-border/60 border border-border/60">
              {t.notes.items.map((it, i) => (
                <li key={i} className="bg-background p-6">
                  <div className="marginalia">NOTE 0{i + 1}</div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                    {pick(lang, it)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Hairline() { return <div className="hairline container" />; }
