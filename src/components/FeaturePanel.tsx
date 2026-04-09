import { FeatureSection } from "@/data/categories";
import FeatureCard from "./FeatureCard";

interface FeaturePanelProps {
  sections: FeatureSection[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 mb-4">
      <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
      {title}
    </h2>
    <div className="grid gap-3">{children}</div>
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
