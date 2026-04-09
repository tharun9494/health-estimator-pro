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
      {/* Complexity Card */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/60">Project Complexity</span>
          <span className="text-sm font-bold text-[#C9A227]">{complexity}%</span>
        </div>
        <Progress value={complexity} className="h-2 bg-white/10 [&>div]:bg-[#C9A227]" />
        <p className="text-xs text-white/40 mt-2">{items.length} of {allFeatures.length} features selected</p>
      </div>

      {/* Base Cost Card */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60">
          <IndianRupee className="w-3.5 h-3.5 text-[#C9A227]" /> Base Cost
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-white/40">Select features to see pricing</p>
        ) : (
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-white/50">Minimum</p>
              <p className="text-xl font-bold text-white">{fmt(minBase)}</p>
            </div>
            <span className="text-white/40 font-medium">–</span>
            <div className="text-right">
              <p className="text-xs text-white/50">Maximum</p>
              <p className="text-xl font-bold text-white">{fmt(maxBase)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Safety Margin Card */}
      {items.length > 0 && (
        <div className="bg-[#C9A227]/10 rounded-xl border border-[#C9A227]/30 p-5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
            <Shield className="w-3.5 h-3.5" /> Safety Margin ({margin}%)
          </div>
          <p className="text-xs text-white/50">For changes, revisions & risk buffer</p>
          <p className="text-sm font-semibold text-white">{fmt(minMargin)} – {fmt(maxMargin)}</p>
        </div>
      )}

      {/* Total Estimate Card - Gold */}
      {items.length > 0 && (
        <div className="bg-[#C9A227] rounded-xl p-5 text-black space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/70">
            <TrendingUp className="w-3.5 h-3.5" /> Estimated Total
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-black/60">Min</p>
              <p className="text-2xl font-extrabold text-black">{fmt(minTotal)}</p>
            </div>
            <span className="text-black/40 font-bold text-lg">–</span>
            <div className="text-right">
              <p className="text-xs text-black/60">Max</p>
              <p className="text-2xl font-extrabold text-black">{fmt(maxTotal)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-black/20">
            <Clock className="w-3.5 h-3.5 text-black/60" />
            <span className="text-sm font-medium text-black/80">Timeline: {days}–{days + 10} days</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
