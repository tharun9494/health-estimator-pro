import { Feature } from "@/data/categories";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Shield, IndianRupee } from "lucide-react";

interface PriceCalculatorProps {
  selected: Set<string>;
  margin: number;
  allFeatures: Feature[];
}

const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

const PriceCalculator = ({ selected, margin, allFeatures }: PriceCalculatorProps) => {
  const items = allFeatures.filter((f) => selected.has(f.id));
  const minBase = items.reduce((s, f) => s + f.price, 0);
  const maxBase = items.reduce((s, f) => s + f.totalCost, 0);
  const days = Math.max(15, items.reduce((s, f) => s + f.days, 0));
  const complexity = Math.min(100, Math.round((items.length / allFeatures.length) * 100));

  const minMargin = minBase * (margin / 100);
  const maxMargin = maxBase * (margin / 100);
  const minTotal = minBase + minMargin;
  const maxTotal = maxBase + maxMargin;

  return (
    <div className="space-y-5">
      <div className="bg-card rounded-xl border border-border p-5 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Project Complexity</span>
          <span className="text-sm font-bold text-primary">{complexity}%</span>
        </div>
        <Progress value={complexity} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">{items.length} of {allFeatures.length} features selected</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 shadow-card space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <IndianRupee className="w-3.5 h-3.5" /> Base Cost
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Select features to see pricing</p>
        ) : (
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-muted-foreground">Minimum</p>
              <p className="text-xl font-bold text-foreground">{fmt(minBase)}</p>
            </div>
            <span className="text-muted-foreground font-medium">–</span>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Maximum</p>
              <p className="text-xl font-bold text-foreground">{fmt(maxBase)}</p>
            </div>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="bg-warning/5 rounded-xl border border-warning/20 p-5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-warning">
            <Shield className="w-3.5 h-3.5" /> Safety Margin ({margin}%)
          </div>
          <p className="text-xs text-muted-foreground">For changes, revisions & risk buffer</p>
          <p className="text-sm font-semibold text-foreground">{fmt(minMargin)} – {fmt(maxMargin)}</p>
        </div>
      )}

      {items.length > 0 && (
        <div className="gradient-primary rounded-xl p-5 text-primary-foreground space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80">
            <TrendingUp className="w-3.5 h-3.5" /> Estimated Total
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-70">Min</p>
              <p className="text-2xl font-extrabold">{fmt(minTotal)}</p>
            </div>
            <span className="opacity-50 font-bold text-lg">–</span>
            <div className="text-right">
              <p className="text-xs opacity-70">Max</p>
              <p className="text-2xl font-extrabold">{fmt(maxTotal)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-primary-foreground/20">
            <Clock className="w-3.5 h-3.5 opacity-70" />
            <span className="text-sm font-medium opacity-80">Timeline: {days}–{days + 10} days</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
