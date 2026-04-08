import { FeatureSection } from "@/data/categories";
import FeatureCard from "./FeatureCard";

interface FeaturePanelProps {
  sections: FeatureSection[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{title}</h2>
    <div className="grid gap-2">{children}</div>
  </div>
);

const FeaturePanel = ({ sections, selected, onToggle }: FeaturePanelProps) => (
  <div>
    {sections.map((section) => (
      <Section key={section.title} title={section.title}>
        {section.features.map((f) => (
          <FeatureCard key={f.id} feature={f} selected={selected.has(f.id)} onToggle={onToggle} />
        ))}
      </Section>
    ))}
  </div>
);

export default FeaturePanel;
