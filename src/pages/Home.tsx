import { useNavigate } from "react-router-dom";
import { categories } from "@/data/categories";
import { ArrowRight, Zap } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

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
      </main>
    </div>
  );
};

export default Home;
