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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-primary-foreground/60 hover:text-primary-foreground text-xs font-medium mb-3 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> All Categories
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-primary-foreground tracking-tight">
                {category.name}
              </h1>
              <p className="text-primary-foreground/60 text-xs md:text-sm">{category.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <FeaturePanel sections={category.sections} selected={selected} onToggle={handleToggle} />
          </div>

          <div className="order-first lg:order-last">
            <div className="lg:sticky lg:top-6 space-y-5">
              <PriceCalculator selected={selected} margin={margin} allFeatures={allFeats} />

              <div className="bg-card rounded-xl border border-border p-5 shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Safety Margin</span>
                  <span className="text-sm font-bold text-primary">{margin}%</span>
                </div>
                <Slider value={[margin]} onValueChange={([v]) => setMargin(v)} min={10} max={25} step={1} />
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
