import { coreFeatures, addonFeatures, extraFeatures } from "@/data/features";
import FeatureCard from "./FeatureCard";

interface FeaturePanelProps {
  selected: Set<string>;
  onToggle: (id: string) => void;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{title}</h2>
    <div className="grid gap-2">{children}</div>
  </div>
);

const FeaturePanel = ({ selected, onToggle }: FeaturePanelProps) => (
  <div>
    <Section title="🏥 Core Modules">
      {coreFeatures.map((f) => (
        <FeatureCard key={f.id} feature={f} selected={selected.has(f.id)} onToggle={onToggle} />
      ))}
    </Section>
    <Section title="➕ Optional Add-Ons">
      {addonFeatures.map((f) => (
        <FeatureCard key={f.id} feature={f} selected={selected.has(f.id)} onToggle={onToggle} />
      ))}
    </Section>
    <Section title="⚙️ Extra Features">
      {extraFeatures.map((f) => (
        <FeatureCard key={f.id} feature={f} selected={selected.has(f.id)} onToggle={onToggle} />
      ))}
    </Section>
  </div>
);

export default FeaturePanel;
