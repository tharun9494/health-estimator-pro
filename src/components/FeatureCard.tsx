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
        ? "bg-[#C9A227]/10 border-[#C9A227]/50 shadow-[0_0_15px_rgba(201,162,39,0.15)]"
        : "bg-white/5 border-white/10 hover:border-[#C9A227]/30 hover:bg-white/10"
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0">
        <span className="text-xl mt-0.5 shrink-0">{feature.icon}</span>
        <div className="min-w-0">
          <h3 className={cn("font-semibold text-sm truncate", selected ? "text-[#C9A227]" : "text-white")}>
            {feature.name}
          </h3>
          <p className="text-xs text-white/50 mt-0.5 line-clamp-1">{feature.description}</p>
          <p className={cn("text-xs font-medium mt-1", selected ? "text-[#C9A227]" : "text-[#C9A227]/80")}>
            ₹{feature.price.toLocaleString("en-IN")} – ₹{feature.totalCost.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
      <Switch
        checked={selected}
        onCheckedChange={() => onToggle(feature.id)}
        className="shrink-0 mt-1 data-[state=checked]:bg-[#C9A227]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  </button>
);

export default FeatureCard;
