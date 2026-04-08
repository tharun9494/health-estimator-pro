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

export const coreFeatures: Feature[] = [
  { id: "uiux", name: "UI/UX Design", description: "Modern healthcare interface design", minPrice: 6000, maxPrice: 8000, icon: "🎨", category: "core", days: 3 },
  { id: "patient", name: "Patient Module", description: "Patient registration, records & history", minPrice: 6000, maxPrice: 9000, icon: "🏥", category: "core", days: 3 },
  { id: "doctor", name: "Doctor Module", description: "Doctor profiles, schedules & assignments", minPrice: 6000, maxPrice: 9000, icon: "👨‍⚕️", category: "core", days: 3 },
  { id: "appointment", name: "Appointment System", description: "Booking, rescheduling & reminders", minPrice: 7000, maxPrice: 10000, icon: "📅", category: "core", days: 4 },
  { id: "admin", name: "Admin Dashboard", description: "Central control panel with analytics", minPrice: 10000, maxPrice: 15000, icon: "📊", category: "core", days: 5 },
  { id: "billing", name: "Billing & Payment", description: "Invoicing, payments & receipts", minPrice: 6000, maxPrice: 10000, icon: "💳", category: "core", days: 3 },
  { id: "backend", name: "Backend & Database", description: "Server infrastructure & data storage", minPrice: 8000, maxPrice: 12000, icon: "🗄️", category: "core", days: 4 },
];

export const addonFeatures: Feature[] = [
  { id: "lab", name: "Lab Management", description: "Lab tests, reports & integration", minPrice: 8000, maxPrice: 15000, icon: "🔬", category: "addon", days: 4 },
  { id: "pharmacy", name: "Pharmacy Management", description: "Medicine inventory & dispensing", minPrice: 8000, maxPrice: 15000, icon: "💊", category: "addon", days: 4 },
  { id: "consultation", name: "Online Consultation", description: "Video calls & telemedicine", minPrice: 10000, maxPrice: 20000, icon: "📹", category: "addon", days: 5 },
  { id: "notifications", name: "SMS / WhatsApp Notifications", description: "Automated alerts & reminders", minPrice: 2000, maxPrice: 5000, icon: "📱", category: "addon", days: 2 },
];

export const extraFeatures: Feature[] = [
  { id: "reports", name: "Patient Reports & Prescription", description: "Auto-generated medical documents", minPrice: 2000, maxPrice: 5000, icon: "📄", category: "extra", days: 1 },
  { id: "security", name: "Data Security & Backup", description: "Encryption & automated backups", minPrice: 2000, maxPrice: 5000, icon: "🔒", category: "extra", days: 1 },
  { id: "staff", name: "Staff / Role Management", description: "User roles & permissions", minPrice: 2000, maxPrice: 5000, icon: "👥", category: "extra", days: 1 },
  { id: "analytics", name: "Advanced Analytics", description: "Detailed reports & insights", minPrice: 2000, maxPrice: 5000, icon: "📈", category: "extra", days: 1 },
  { id: "queue", name: "Queue / Token System", description: "Patient queue management", minPrice: 2000, maxPrice: 5000, icon: "🎫", category: "extra", days: 1 },
  { id: "department", name: "Department Management", description: "Multi-department organization", minPrice: 2000, maxPrice: 5000, icon: "🏢", category: "extra", days: 1 },
  { id: "bed", name: "Bed / Room Management", description: "Room allocation & availability", minPrice: 2000, maxPrice: 5000, icon: "🛏️", category: "extra", days: 1 },
  { id: "ambulance", name: "Ambulance Module", description: "Ambulance tracking & dispatch", minPrice: 2000, maxPrice: 5000, icon: "🚑", category: "extra", days: 1 },
  { id: "website", name: "Website Integration", description: "Public website with booking", minPrice: 2000, maxPrice: 5000, icon: "🌐", category: "extra", days: 2 },
];

export const allFeatures = [...coreFeatures, ...addonFeatures, ...extraFeatures];
