export interface Feature {
  id: string;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  icon: string;
  category: "core" | "addon" | "extra";
  days: number;
}

export interface FeatureSection {
  title: string;
  features: Feature[];
}

export interface BusinessCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  sections: FeatureSection[];
}

const hospital: BusinessCategory = {
  id: "hospital",
  name: "Hospital Management System",
  icon: "🏥",
  description: "Complete HMS with patient, doctor, billing & more",
  color: "from-blue-600 to-cyan-500",
  sections: [
    {
      title: "🏥 Core Modules",
      features: [
        { id: "h-uiux", name: "UI/UX Design", description: "Modern healthcare interface design", minPrice: 6000, maxPrice: 8000, icon: "🎨", category: "core", days: 3 },
        { id: "h-patient", name: "Patient Module", description: "Patient registration, records & history", minPrice: 6000, maxPrice: 9000, icon: "🏥", category: "core", days: 3 },
        { id: "h-doctor", name: "Doctor Module", description: "Doctor profiles, schedules & assignments", minPrice: 6000, maxPrice: 9000, icon: "👨‍⚕️", category: "core", days: 3 },
        { id: "h-appointment", name: "Appointment System", description: "Booking, rescheduling & reminders", minPrice: 7000, maxPrice: 10000, icon: "📅", category: "core", days: 4 },
        { id: "h-admin", name: "Admin Dashboard", description: "Central control panel with analytics", minPrice: 10000, maxPrice: 15000, icon: "📊", category: "core", days: 5 },
        { id: "h-billing", name: "Billing & Payment", description: "Invoicing, payments & receipts", minPrice: 6000, maxPrice: 10000, icon: "💳", category: "core", days: 3 },
        { id: "h-backend", name: "Backend & Database", description: "Server infrastructure & data storage", minPrice: 8000, maxPrice: 12000, icon: "🗄️", category: "core", days: 4 },
      ],
    },
    {
      title: "➕ Optional Add-Ons",
      features: [
        { id: "h-lab", name: "Lab Management", description: "Lab tests, reports & integration", minPrice: 8000, maxPrice: 15000, icon: "🔬", category: "addon", days: 4 },
        { id: "h-pharmacy", name: "Pharmacy Management", description: "Medicine inventory & dispensing", minPrice: 8000, maxPrice: 15000, icon: "💊", category: "addon", days: 4 },
        { id: "h-consultation", name: "Online Consultation", description: "Video calls & telemedicine", minPrice: 10000, maxPrice: 20000, icon: "📹", category: "addon", days: 5 },
        { id: "h-notifications", name: "SMS / WhatsApp Notifications", description: "Automated alerts & reminders", minPrice: 2000, maxPrice: 5000, icon: "📱", category: "addon", days: 2 },
      ],
    },
    {
      title: "⚙️ Extra Features",
      features: [
        { id: "h-reports", name: "Patient Reports & Prescription", description: "Auto-generated medical documents", minPrice: 2000, maxPrice: 5000, icon: "📄", category: "extra", days: 1 },
        { id: "h-security", name: "Data Security & Backup", description: "Encryption & automated backups", minPrice: 2000, maxPrice: 5000, icon: "🔒", category: "extra", days: 1 },
        { id: "h-staff", name: "Staff / Role Management", description: "User roles & permissions", minPrice: 2000, maxPrice: 5000, icon: "👥", category: "extra", days: 1 },
        { id: "h-analytics", name: "Advanced Analytics", description: "Detailed reports & insights", minPrice: 2000, maxPrice: 5000, icon: "📈", category: "extra", days: 1 },
        { id: "h-queue", name: "Queue / Token System", description: "Patient queue management", minPrice: 2000, maxPrice: 5000, icon: "🎫", category: "extra", days: 1 },
      ],
    },
  ],
};

const businessWebsite: BusinessCategory = {
  id: "business-website",
  name: "Business Website",
  icon: "🌐",
  description: "Professional website with SEO, admin panel & more",
  color: "from-violet-600 to-purple-500",
  sections: [
    {
      title: "🌐 Core Pages",
      features: [
        { id: "bw-landing", name: "Landing Page", description: "Hero section, CTA & key info", minPrice: 3000, maxPrice: 6000, icon: "🏠", category: "core", days: 2 },
        { id: "bw-about", name: "About Page", description: "Company story & team info", minPrice: 2000, maxPrice: 4000, icon: "ℹ️", category: "core", days: 1 },
        { id: "bw-services", name: "Services Page", description: "Service listings & details", minPrice: 3000, maxPrice: 5000, icon: "⚡", category: "core", days: 2 },
        { id: "bw-contact", name: "Contact Page", description: "Contact form & map integration", minPrice: 2000, maxPrice: 3000, icon: "📧", category: "core", days: 1 },
      ],
    },
    {
      title: "➕ Add-Ons",
      features: [
        { id: "bw-admin", name: "Admin Panel", description: "Content management dashboard", minPrice: 5000, maxPrice: 10000, icon: "📊", category: "addon", days: 4 },
        { id: "bw-seo", name: "SEO Setup", description: "On-page SEO & meta optimization", minPrice: 3000, maxPrice: 7000, icon: "🔍", category: "addon", days: 2 },
        { id: "bw-hosting", name: "Hosting Setup", description: "Domain, SSL & deployment", minPrice: 2000, maxPrice: 5000, icon: "☁️", category: "addon", days: 1 },
      ],
    },
  ],
};

const interiorDesign: BusinessCategory = {
  id: "interior-design",
  name: "Interior Design Services",
  icon: "🏠",
  description: "Portfolio, project showcase & client booking system",
  color: "from-amber-500 to-orange-500",
  sections: [
    {
      title: "🏠 Core Modules",
      features: [
        { id: "id-portfolio", name: "Portfolio Website", description: "Showcase past projects beautifully", minPrice: 5000, maxPrice: 10000, icon: "🖼️", category: "core", days: 3 },
        { id: "id-showcase", name: "Project Showcase", description: "Detailed project galleries & info", minPrice: 4000, maxPrice: 8000, icon: "✨", category: "core", days: 3 },
        { id: "id-booking", name: "Client Booking", description: "Consultation booking & scheduling", minPrice: 5000, maxPrice: 12000, icon: "📅", category: "core", days: 4 },
        { id: "id-3d", name: "3D Design Integration", description: "3D room visualization tools", minPrice: 10000, maxPrice: 25000, icon: "🎯", category: "core", days: 7 },
        { id: "id-admin", name: "Admin Panel", description: "Manage projects, clients & content", minPrice: 5000, maxPrice: 10000, icon: "📊", category: "core", days: 4 },
      ],
    },
  ],
};

const ecommerce: BusinessCategory = {
  id: "ecommerce",
  name: "E-commerce Website",
  icon: "🛒",
  description: "Full online store with payments, cart & order tracking",
  color: "from-emerald-600 to-teal-500",
  sections: [
    {
      title: "🛒 Core Modules",
      features: [
        { id: "ec-products", name: "Product Listing", description: "Catalog with filters & search", minPrice: 5000, maxPrice: 10000, icon: "📦", category: "core", days: 3 },
        { id: "ec-cart", name: "Cart System", description: "Add to cart, wishlist & checkout", minPrice: 5000, maxPrice: 8000, icon: "🛒", category: "core", days: 3 },
        { id: "ec-payment", name: "Payment Gateway", description: "Razorpay, Stripe integration", minPrice: 6000, maxPrice: 12000, icon: "💳", category: "core", days: 4 },
        { id: "ec-admin", name: "Admin Panel", description: "Manage products, orders & users", minPrice: 8000, maxPrice: 15000, icon: "📊", category: "core", days: 5 },
        { id: "ec-orders", name: "Order Tracking", description: "Real-time order status updates", minPrice: 5000, maxPrice: 10000, icon: "🚚", category: "core", days: 3 },
      ],
    },
  ],
};

const gym: BusinessCategory = {
  id: "gym",
  name: "Gym Management System",
  icon: "🏋️",
  description: "Member management, subscriptions & trainer modules",
  color: "from-red-500 to-rose-500",
  sections: [
    {
      title: "🏋️ Core Modules",
      features: [
        { id: "g-members", name: "Member Management", description: "Registration, profiles & records", minPrice: 5000, maxPrice: 10000, icon: "👤", category: "core", days: 3 },
        { id: "g-trainer", name: "Trainer Module", description: "Trainer profiles & assignments", minPrice: 5000, maxPrice: 8000, icon: "💪", category: "core", days: 3 },
        { id: "g-subscription", name: "Subscription Plans", description: "Plan creation & renewals", minPrice: 5000, maxPrice: 10000, icon: "📋", category: "core", days: 3 },
        { id: "g-attendance", name: "Attendance Tracking", description: "Check-in/out & attendance logs", minPrice: 4000, maxPrice: 8000, icon: "✅", category: "core", days: 2 },
        { id: "g-mobile", name: "Mobile Integration", description: "Mobile-responsive member portal", minPrice: 8000, maxPrice: 15000, icon: "📱", category: "core", days: 5 },
      ],
    },
  ],
};

export const categories: BusinessCategory[] = [hospital, businessWebsite, interiorDesign, ecommerce, gym];

export const getCategoryById = (id: string) => categories.find((c) => c.id === id);

export const getAllFeatures = (category: BusinessCategory): Feature[] =>
  category.sections.flatMap((s) => s.features);
