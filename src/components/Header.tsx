import { Activity } from "lucide-react";

const Header = () => (
  <header className="gradient-hero py-8 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-primary/20 backdrop-blur-sm">
          <Activity className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-foreground tracking-tight">
          MediBuild
        </h1>
      </div>
      <p className="text-primary-foreground/70 text-sm md:text-base max-w-xl">
        Hospital Management System — Instant Cost Estimator. Select features, see pricing in real-time.
      </p>
    </div>
  </header>
);

export default Header;
