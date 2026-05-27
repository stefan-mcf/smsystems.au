import { siteMeta } from '@/content/site';

export function CapabilityStrip() {
  return (
    <section className="capability-strip" aria-label="Capabilities">
      {siteMeta.capabilityStrip.map((item) => (
        <span className="capability-pill" key={item}>
          {item}
        </span>
      ))}
    </section>
  );
}
