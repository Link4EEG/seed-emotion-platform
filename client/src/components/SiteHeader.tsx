import { Link, useLocation } from "wouter";
import { useLang } from "@/contexts/LangContext";
import { I18N, pick } from "@/lib/i18n";
import { motion } from "framer-motion";

/**
 * Magazine-style masthead with bilingual nav and a top-right KO/EN toggle.
 * The toggle slides a dark indicator across the two language labels and
 * is keyboard accessible (focus ring on the underlying button).
 */
export default function SiteHeader() {
  const { lang, setLang } = useLang();
  const [pathname] = useLocation();

  const navItems = [
    { href: "/",      key: "intro" as const },
    { href: "/usage", key: "usage" as const },
  ];

  return (
    <header className="border-b border-border/70 backdrop-blur-md bg-background/80 sticky top-0 z-40">
      {/* top thin meta strip */}
      <div className="border-b border-border/60">
        <div className="container flex items-center justify-between py-1.5">
          <span className="marginalia">{pick(lang, I18N.common.issue)}</span>
          <span className="marginalia hidden md:inline">val_acc 0.9698 · 32 + 8 ch · 200 Hz</span>
        </div>
      </div>

      <div className="container flex items-center justify-between py-5">
        {/* logo / brand */}
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="display text-[26px] md:text-[30px] leading-none tracking-tight">
            SEED
          </span>
          <span className="meta hidden md:inline">/ Emotion Platform</span>
        </Link>

        {/* center nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(it => {
            const active = pathname === it.href || (it.href === "/" && pathname === "");
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`text-[15px] tracking-tight link-underline ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                {pick(lang, I18N.common.nav[it.key])}
              </Link>
            );
          })}
        </nav>

        {/* right side: language toggle */}
        <LangToggle />
      </div>
    </header>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language"
      className="relative inline-flex items-center rounded-full border border-foreground/20 p-0.5 bg-background/60"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 460, damping: 32 }}
        className="absolute top-0.5 bottom-0.5 w-[46px] rounded-full bg-foreground"
        style={{ left: lang === "ko" ? 2 : 48 }}
        aria-hidden
      />
      {(["ko", "en"] as const).map(code => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className={`relative z-10 w-[46px] h-7 text-[11px] tracking-[0.18em] uppercase transition-colors ${active ? "text-background" : "text-foreground/70 hover:text-foreground"}`}
            aria-pressed={active}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
