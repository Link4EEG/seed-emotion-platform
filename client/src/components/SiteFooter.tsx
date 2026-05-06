import { useLang } from "@/contexts/LangContext";
import { I18N, pick } from "@/lib/i18n";

export default function SiteFooter() {
  const { lang } = useLang();
  return (
    <footer className="mt-32 border-t border-border/70">
      <div className="container py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="display text-2xl">SEED</div>
          <div className="meta mt-1">{pick(lang, I18N.common.tagline)}</div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {pick(lang, I18N.common.footer.caption)}
        </p>
        <div className="md:text-right">
          <div className="meta">© 2026 · Manus AI</div>
          <div className="marginalia mt-1">{pick(lang, I18N.common.footer.colophon)}</div>
        </div>
      </div>
    </footer>
  );
}
