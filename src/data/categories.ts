export interface Feature {
  id: string;
  name: string;
  description: string;
  price: number;
  totalCost: number;
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
        { id: "h-uiux", name: "UI/UX Design", description: "Modern healthcare interface design", price: 6000, totalCost: 8000, icon: "🎨", category: "core", days: 3 },
        { id: "h-patient", name: "Patient Module", description: "Patient registration, records & history", price: 6000, totalCost: 9000, icon: "🏥", category: "core", days: 3 },
        { id: "h-doctor", name: "Doctor Module", description: "Doctor profiles, schedules & assignments", price: 6000, totalCost: 9000, icon: "👨‍⚕️", category: "core", days: 3 },
        { id: "h-appointment", name: "Appointment System", description: "Booking, rescheduling & reminders", price: 7000, totalCost: 10000, icon: "📅", category: "core", days: 4 },
        { id: "h-admin", name: "Admin Dashboard", description: "Central control panel with analytics", price: 10000, totalCost: 15000, icon: "📊", category: "core", days: 5 },
        { id: "h-billing", name: "Billing & Payment", description: "Invoicing, payments & receipts", price: 6000, totalCost: 10000, icon: "💳", category: "core", days: 3 },
        { id: "h-backend", name: "Backend & Database", description: "Server infrastructure & data storage", price: 8000, totalCost: 12000, icon: "🗄️", category: "core", days: 4 },
      ],
    },
    {
      title: "➕ Optional Add-Ons",
      features: [
        { id: "h-lab", name: "Lab Management", description: "Lab tests, reports & integration", price: 8000, totalCost: 15000, icon: "🔬", category: "addon", days: 4 },
        { id: "h-pharmacy", name: "Pharmacy Management", description: "Medicine inventory & dispensing", price: 8000, totalCost: 15000, icon: "💊", category: "addon", days: 4 },
        { id: "h-consultation", name: "Online Consultation", description: "Video calls & telemedicine", price: 10000, totalCost: 20000, icon: "📹", category: "addon", days: 5 },
        { id: "h-notifications", name: "SMS / WhatsApp Notifications", description: "Automated alerts & reminders", price: 2000, totalCost: 5000, icon: "📱", category: "addon", days: 2 },
      ],
    },
    {
      title: "⚙️ Extra Features",
      features: [
        { id: "h-reports", name: "Patient Reports & Prescription", description: "Auto-generated medical documents", price: 2000, totalCost: 5000, icon: "📄", category: "extra", days: 1 },
        { id: "h-security", name: "Data Security & Backup", description: "Encryption & automated backups", price: 2000, totalCost: 5000, icon: "🔒", category: "extra", days: 1 },
        { id: "h-staff", name: "Staff / Role Management", description: "User roles & permissions", price: 2000, totalCost: 5000, icon: "👥", category: "extra", days: 1 },
        { id: "h-analytics", name: "Advanced Analytics", description: "Detailed reports & insights", price: 2000, totalCost: 5000, icon: "📈", category: "extra", days: 1 },
        { id: "h-queue", name: "Queue / Token System", description: "Patient queue management", price: 2000, totalCost: 5000, icon: "🎫", category: "extra", days: 1 },
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
        { id: "bw-landing", name: "Landing Page", description: "Hero section, CTA & key info", price: 3000, totalCost: 6000, icon: "🏠", category: "core", days: 2 },
        { id: "bw-about", name: "About Page", description: "Company story & team info", price: 2000, totalCost: 4000, icon: "ℹ️", category: "core", days: 1 },
        { id: "bw-services", name: "Services Page", description: "Service listings & details", price: 3000, totalCost: 5000, icon: "⚡", category: "core", days: 2 },
        { id: "bw-contact", name: "Contact Page", description: "Contact form & map integration", price: 2000, totalCost: 3000, icon: "📧", category: "core", days: 1 },
      ],
    },
    {
      title: "➕ Add-Ons",
      features: [
        { id: "bw-admin", name: "Admin Panel", description: "Content management dashboard", price: 5000, totalCost: 10000, icon: "📊", category: "addon", days: 4 },
        { id: "bw-seo", name: "SEO Setup", description: "On-page SEO & meta optimization", price: 3000, totalCost: 7000, icon: "🔍", category: "addon", days: 2 },
        { id: "bw-hosting", name: "Hosting Setup", description: "Domain, SSL & deployment", price: 2000, totalCost: 5000, icon: "☁️", category: "addon", days: 1 },
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
        { id: "id-portfolio", name: "Portfolio Website", description: "Showcase past projects beautifully", price: 5000, totalCost: 10000, icon: "🖼️", category: "core", days: 3 },
        { id: "id-showcase", name: "Project Showcase", description: "Detailed project galleries & info", price: 4000, totalCost: 8000, icon: "✨", category: "core", days: 3 },
        { id: "id-booking", name: "Client Booking", description: "Consultation booking & scheduling", price: 5000, totalCost: 12000, icon: "📅", category: "core", days: 4 },
        { id: "id-3d", name: "3D Design Integration", description: "3D room visualization tools", price: 10000, totalCost: 25000, icon: "🎯", category: "core", days: 7 },
        { id: "id-admin", name: "Admin Panel", description: "Manage projects, clients & content", price: 5000, totalCost: 10000, icon: "📊", category: "core", days: 4 },
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
        { id: "ec-products", name: "Product Listing", description: "Catalog with filters & search", price: 5000, totalCost: 10000, icon: "📦", category: "core", days: 3 },
        { id: "ec-cart", name: "Cart System", description: "Add to cart, wishlist & checkout", price: 5000, totalCost: 8000, icon: "🛒", category: "core", days: 3 },
        { id: "ec-payment", name: "Payment Gateway", description: "Razorpay, Stripe integration", price: 6000, totalCost: 12000, icon: "💳", category: "core", days: 4 },
        { id: "ec-admin", name: "Admin Panel", description: "Manage products, orders & users", price: 8000, totalCost: 15000, icon: "📊", category: "core", days: 5 },
        { id: "ec-orders", name: "Order Tracking", description: "Real-time order status updates", price: 5000, totalCost: 10000, icon: "🚚", category: "core", days: 3 },
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
        { id: "g-members", name: "Member Management", description: "Registration, profiles & records", price: 5000, totalCost: 10000, icon: "👤", category: "core", days: 3 },
        { id: "g-trainer", name: "Trainer Module", description: "Trainer profiles & assignments", price: 5000, totalCost: 8000, icon: "💪", category: "core", days: 3 },
        { id: "g-subscription", name: "Subscription Plans", description: "Plan creation & renewals", price: 5000, totalCost: 10000, icon: "📋", category: "core", days: 3 },
        { id: "g-attendance", name: "Attendance Tracking", description: "Check-in/out & attendance logs", price: 4000, totalCost: 8000, icon: "✅", category: "core", days: 2 },
        { id: "g-mobile", name: "Mobile Integration", description: "Mobile-responsive member portal", price: 8000, totalCost: 15000, icon: "📱", category: "core", days: 5 },
      ],
    },
  ],
};

const salon: BusinessCategory = {
  id: "salon",
  name: "Salon Management System",
  icon: "💇",
  description: "Appointment booking, staff management & POS billing",
  color: "from-pink-500 to-rose-400",
  sections: [
    {
      title: "💇 Core Modules",
      features: [
        { id: "s-appointment", name: "Appointment Booking", description: "Online & walk-in booking system", price: 5000, totalCost: 10000, icon: "📅", category: "core", days: 3 },
        { id: "s-staff", name: "Staff Management", description: "Stylist profiles & scheduling", price: 4000, totalCost: 8000, icon: "👤", category: "core", days: 3 },
        { id: "s-pos", name: "POS & Billing", description: "Invoicing, payments & receipts", price: 5000, totalCost: 10000, icon: "💳", category: "core", days: 3 },
        { id: "s-services", name: "Service Menu", description: "Treatments, pricing & packages", price: 3000, totalCost: 6000, icon: "✂️", category: "core", days: 2 },
        { id: "s-inventory", name: "Inventory Tracking", description: "Products & supplies management", price: 4000, totalCost: 8000, icon: "📦", category: "core", days: 3 },
      ],
    },
    {
      title: "➕ Optional Add-Ons",
      features: [
        { id: "s-rewards", name: "Loyalty Program", description: "Points, rewards & membership", price: 5000, totalCost: 10000, icon: "🎁", category: "addon", days: 3 },
        { id: "s-sms", name: "SMS Reminders", description: "Auto appointment reminders", price: 2000, totalCost: 5000, icon: "📱", category: "addon", days: 2 },
        { id: "s-reviews", name: "Review System", description: "Customer feedback & ratings", price: 3000, totalCost: 6000, icon: "⭐", category: "addon", days: 2 },
      ],
    },
  ],
};

const restaurant: BusinessCategory = {
  id: "restaurant",
  name: "Restaurant Management System",
  icon: "🍽️",
  description: "Table booking, order management, kitchen & billing",
  color: "from-orange-500 to-amber-500",
  sections: [
    {
      title: "🍽️ Core Modules",
      features: [
        { id: "r-menu", name: "Digital Menu", description: "QR menu with categories & photos", price: 4000, totalCost: 8000, icon: "📋", category: "core", days: 2 },
        { id: "r-table", name: "Table Booking", description: "Reserve tables & floor plan", price: 5000, totalCost: 10000, icon: "🪑", category: "core", days: 3 },
        { id: "r-order", name: "Order Management", description: "Dine-in, takeaway & delivery", price: 6000, totalCost: 12000, icon: "🛎️", category: "core", days: 4 },
        { id: "r-kitchen", name: "Kitchen Display", description: "KOT & order tracking", price: 4000, totalCost: 8000, icon: "👨‍🍳", category: "core", days: 3 },
        { id: "r-billing", name: "Billing & POS", description: "Split bills, taxes & invoicing", price: 5000, totalCost: 10000, icon: "💳", category: "core", days: 3 },
      ],
    },
    {
      title: "➕ Optional Add-Ons",
      features: [
        { id: "r-delivery", name: "Delivery Integration", description: "Swiggy, Zomato & in-house delivery", price: 8000, totalCost: 15000, icon: "🚚", category: "addon", days: 5 },
        { id: "r-inventory", name: "Inventory & Stock", description: "Ingredient tracking & alerts", price: 5000, totalCost: 10000, icon: "📦", category: "addon", days: 3 },
        { id: "r-analytics", name: "Sales Analytics", description: "Reports, trends & insights", price: 4000, totalCost: 8000, icon: "📊", category: "addon", days: 3 },
      ],
    },
  ],
};

const basicWebsite: BusinessCategory = {
  id: "basic-website",
  name: "Basic Website",
  icon: "🌐",
  description: "Simple 3-5 page website for small businesses",
  color: "from-slate-500 to-gray-400",
  sections: [
    {
      title: "🌐 Essential Pages",
      features: [
        { id: "bw-home", name: "Home Page", description: "Hero, features & CTA section", price: 2000, totalCost: 4000, icon: "🏠", category: "core", days: 1 },
        { id: "bw-about", name: "About Page", description: "Company info & team", price: 1500, totalCost: 3000, icon: "ℹ️", category: "core", days: 1 },
        { id: "bw-services", name: "Services/Products", description: "What you offer listing", price: 2000, totalCost: 4000, icon: "⚡", category: "core", days: 1 },
        { id: "bw-contact", name: "Contact Page", description: "Form, map & details", price: 1500, totalCost: 3000, icon: "📧", category: "core", days: 1 },
      ],
    },
    {
      title: "➕ Add-Ons",
      features: [
        { id: "bw-gallery", name: "Photo Gallery", description: "Portfolio or product images", price: 1500, totalCost: 3000, icon: "🖼️", category: "addon", days: 1 },
        { id: "bw-blog", name: "Blog Section", description: "Articles & news", price: 3000, totalCost: 6000, icon: "📝", category: "addon", days: 2 },
        { id: "bw-seo", name: "Basic SEO", description: "Meta tags & optimization", price: 2000, totalCost: 4000, icon: "🔍", category: "addon", days: 1 },
        { id: "bw-hosting", name: "Domain & Hosting", description: "Setup & deployment", price: 1500, totalCost: 3000, icon: "☁️", category: "addon", days: 1 },
      ],
    },
  ],
};

export const categories: BusinessCategory[] = [hospital, businessWebsite, interiorDesign, ecommerce, gym, salon, restaurant, basicWebsite];

export const getCategoryById = (id: string) => categories.find((c) => c.id === id);

export const getAllFeatures = (category: BusinessCategory): Feature[] =>
  category.sections.flatMap((s) => s.features);
