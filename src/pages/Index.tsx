import { useState, useCallback } from "react";
import Header from "@/components/Header";
import FeaturePanel from "@/components/FeaturePanel";
import PriceCalculator from "@/components/PriceCalculator";
import ClientForm, { ClientInfo } from "@/components/ClientForm";
import QuoteActions from "@/components/QuoteActions";
import { Slider } from "@/components/ui/slider";

const Index = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [margin, setMargin] = useState(15);
  const [client, setClient] = useState<ClientInfo>({ name: "", phone: "", business: "" });

  const handleToggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left — Feature Selection */}
          <div>
            <FeaturePanel selected={selected} onToggle={handleToggle} />
          </div>

          {/* Right — Sticky Calculator */}
          <div className="order-first lg:order-last">
            <div className="lg:sticky lg:top-6 space-y-5">
              <PriceCalculator selected={selected} margin={margin} />

              {/* Margin slider */}
              <div className="bg-card rounded-xl border border-border p-5 shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Safety Margin</span>
                  <span className="text-sm font-bold text-primary">{margin}%</span>
                </div>
                <Slider value={[margin]} onValueChange={([v]) => setMargin(v)} min={10} max={25} step={1} />
              </div>

              <ClientForm info={client} onChange={setClient} />
              <QuoteActions selected={selected} margin={margin} client={client} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
