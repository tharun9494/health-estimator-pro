import { Feature } from "@/data/categories";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  feature: Feature;
  selected: boolean;
  onToggle: (id: string) => void;
}

const FeatureCard = ({ feature, selected, onToggle }: FeatureCardProps) => (
  <button
    onClick={() => onToggle(feature.id)}
    className={cn(
      "w-full text-left rounded-xl p-4 transition-all duration-200 border",
      selected
        ? "bg-primary/5 border-primary/30 shadow-card-hover"
        : "bg-card border-border hover:border-primary/20 shadow-card hover:shadow-card-hover"
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0">
        <span className="text-xl mt-0.5 shrink-0">{feature.icon}</span>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">{feature.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{feature.description}</p>
          <p className="text-xs font-medium text-primary mt-1">
            ₹{feature.minPrice.toLocaleString("en-IN")} – ₹{feature.maxPrice.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
      <Switch
        checked={selected}
        onCheckedChange={() => onToggle(feature.id)}
        className="shrink-0 mt-1"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  </button>
);

export default FeatureCard;
