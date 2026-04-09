import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getAllCategories } from "@/lib/firestoreService";
import { BusinessCategory } from "@/data/categories";
import { ArrowRight, Loader2, Sparkles, Shield, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#C9A227]/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <img 
              src="https://fore-fight-era.vercel.app/assets/3-Bsr_pCU3.png" 
              alt="Fore Fight Era" 
              className="h-10 w-auto"
            />
            <Link to="/admin">
              <Button variant="ghost" className="text-white/70 hover:text-[#C9A227] hover:bg-white/5">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-4 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A227]/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <img 
            src="https://fore-fight-era.vercel.app/assets/3-Bsr_pCU3.png" 
            alt="Fore Fight Era Logo" 
            className="h-24 md:h-32 mx-auto mb-8 object-contain drop-shadow-2xl"
          />
          <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-[#C9A227]/30">
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
            <span className="text-sm font-medium text-[#C9A227]">Professional Cost Estimation System</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Get Accurate <span className="text-[#C9A227]">Project Quotes</span><br />In Seconds
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Select your project type and receive instant, transparent pricing. No hidden costs — just professional estimates.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Clock className="w-5 h-5 text-[#C9A227] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">Instant</p>
              <p className="text-xs text-white/50">Quotes</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Shield className="w-5 h-5 text-[#C9A227] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-white/50">Transparent</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <TrendingUp className="w-5 h-5 text-[#C9A227] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">Best</p>
              <p className="text-xs text-white/50">Pricing</p>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Section */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Select Your Project Type</h2>
          <p className="text-white/50">Choose a category to get started with your estimate</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#C9A227]" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={loadCategories} className="bg-[#C9A227] text-black hover:bg-[#B8921F]">
              Try Again
            </Button>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50 mb-4">No categories available</p>
            <Link to="/admin">
              <Button className="bg-[#C9A227] text-black hover:bg-[#B8921F]">
                Go to Admin
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <Card
                key={cat.id}
                onClick={() => navigate(`/estimate/${cat.id}`)}
                className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border-white/10 p-6 cursor-pointer hover:border-[#C9A227]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#C9A227]/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/0 to-[#C9A227]/0 group-hover:from-[#C9A227]/5 group-hover:to-transparent transition-all duration-300" />
                <div className="relative">
                  <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A227] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">{cat.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#C9A227] group-hover:gap-3 transition-all">
                    Get Estimate
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://fore-fight-era.vercel.app/assets/3-Bsr_pCU3.png" 
                alt="Fore Fight Era" 
                className="h-8 w-auto opacity-80"
              />
              <span className="text-white/50 text-sm">© 2024 Fore Fight Era. All rights reserved.</span>
            </div>
            <Link to="/admin" className="text-sm text-white/40 hover:text-[#C9A227] transition-colors">
              Admin Panel →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
