export default function SiteFooter() {
  return (
    <footer id="contact" className="site-section">
      <div className="site-shell py-8 sm:py-10">
        <div className="reading-width">
          <p className="section-kicker">Contact</p>
          <nav
            aria-label="Social links"
            className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"
          >
            <a className="editorial-link" href="mailto:timroty13@gmail.com">
              Email
            </a>
            <a
              className="editorial-link"
              href="https://github.com/timroty"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="editorial-link"
              href="https://www.linkedin.com/in/timroty"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </nav>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tim Roty
        </p>
      </div>
    </footer>
  );
}
