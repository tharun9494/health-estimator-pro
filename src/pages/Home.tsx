import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getAllCategories } from "@/lib/firestoreService";
import { BusinessCategory } from "@/data/categories";
import { ArrowRight, Zap, Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="gradient-hero py-16 px-4 md:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-4 h-4 text-primary-foreground" />
            <span className="text-xs font-semibold text-primary-foreground/80 uppercase tracking-wider">Instant Cost Estimator</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground tracking-tight leading-tight mb-4">
            Build Smarter.<br />Price Faster.
          </h1>
          <p className="text-primary-foreground/60 text-sm md:text-lg max-w-xl mx-auto">
            Select your project type and get an instant, transparent cost breakdown. No guesswork — just clear pricing.
          </p>
        </div>
      </header>

      {/* Category Cards */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 -mt-10 pb-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={loadCategories}>Try Again</Button>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No categories available</p>
            <Link to="/admin">
              <Button>Go to Admin to Add Categories</Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/estimate/${cat.id}`)}
                className="group bg-card rounded-2xl border border-border p-6 text-left shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-4xl block mb-4">{cat.icon}</span>
                <h2 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {cat.name}
                </h2>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{cat.description}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                  Select & Continue
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Footer with hidden admin link */}
      <footer className="border-t py-6 text-center">
        <Link to="/admin" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          Admin
        </Link>
      </footer>
    </div>
  );
};

export default Home;
