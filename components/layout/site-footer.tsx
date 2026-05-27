import { siteMeta } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div>
          <p className="footer-kicker">
            © 2026 STEFAN MCFEETERS | SM SYSTEMS
          </p>

          <p className="footer-line">
            Automation systems, lead leakage audits, API workflows, dashboards, and operator tools.
          </p>
        </div>
        <nav className="footer-contact-links" aria-label="Contact links">
          {siteMeta.contact.routes.map((route) => (
            <a
              href={route.href}
              key={route.label}
              target={route.href.startsWith('http') ? '_blank' : undefined}
              rel={route.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {route.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
