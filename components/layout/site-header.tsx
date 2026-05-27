import Link from 'next/link';
import { siteMeta } from '@/content/site';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <div className="brand-block">
          <Link className="brand" href="/">
            Stefan McFeeters
          </Link>
          <p className="brand-subtitle">automation systems</p>
        </div>
        <nav className="site-nav" aria-label="Primary">
          {siteMeta.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
