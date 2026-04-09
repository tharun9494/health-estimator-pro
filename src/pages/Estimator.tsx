import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoryById } from "@/lib/firestoreService";
import { BusinessCategory, Feature } from "@/data/categories";
import FeaturePanel from "@/components/FeaturePanel";
import PriceCalculator from "@/components/PriceCalculator";
import ClientForm, { ClientInfo } from "@/components/ClientForm";
import QuoteActions from "@/components/QuoteActions";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const getAllFeatures = (category: BusinessCategory): Feature[] =>
  category.sections.flatMap((s) => s.features);

const Estimator = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<BusinessCategory | null>(null);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [margin, setMargin] = useState(15);
  const [client, setClient] = useState<ClientInfo>({ name: "", phone: "", business: "" });

  useEffect(() => {
    const loadCategory = async () => {
      if (!categoryId) return;
      try {
        setLoading(true);
        const data = await getCategoryById(categoryId);
        setCategory(data);
      } catch (error) {
        console.error("Error loading category:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCategory();
  }, [categoryId]);

  const handleToggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">Category not found</p>
          <Button onClick={() => navigate("/")} variant="outline">Go Home</Button>
        </div>
      </div>
    );
  }

  const allFeats = getAllFeatures(category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-[#C9A227]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-white/60 hover:text-[#C9A227] text-xs transition-colors">
                <ArrowLeft className="w-4 h-4" /> Home
              </button>
              <div className="h-6 w-px bg-white/20" />
              <img 
                src="https://fore-fight-era.vercel.app/assets/3-Bsr_pCU3.png" 
                alt="Fore Fight Era" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <h1 className="text-lg font-bold text-white">{category.name}</h1>
            </div>
          </div>
        </div>
      </header>
      
      {/* Category Title Section */}
      <div className="pt-20 pb-6 px-4 md:px-8 bg-gradient-to-r from-gray-900 to-black border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/50 text-sm">{category.description}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <FeaturePanel sections={category.sections} selected={selected} onToggle={handleToggle} />
          </div>

          <div className="order-first lg:order-last">
            <div className="lg:sticky lg:top-24 space-y-5">
              <PriceCalculator selected={selected} margin={margin} allFeatures={allFeats} />

              <div className="bg-white/5 rounded-xl border border-white/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">Safety Margin</span>
                  <span className="text-sm font-bold text-[#C9A227]">{margin}%</span>
                </div>
                <Slider value={[margin]} onValueChange={([v]) => setMargin(v)} min={10} max={25} step={1} className="[&_[role=slider]]:bg-[#C9A227] [&_[role=slider]]:border-[#C9A227] [&_.bg-primary]:bg-[#C9A227]" />
              </div>

              <ClientForm info={client} onChange={setClient} />
              <QuoteActions selected={selected} margin={margin} client={client} categoryName={category.name} allFeatures={allFeats} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Estimator;
