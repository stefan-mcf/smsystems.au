import type { ProofItem } from '@/content/proof';
import { ProofCard } from './proof-card';

type ProofGridProps = {
  items: ProofItem[];
};

export function ProofGrid({ items }: ProofGridProps) {
  return (
    <div className="proof-grid">
      {items.map((item) => (
        <ProofCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
