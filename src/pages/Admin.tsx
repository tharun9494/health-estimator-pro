import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Printer,
  Save,
  X,
  ChevronDown,
  Loader2,
  Database,
  Eye,
  RefreshCw,
  Table,
  ArrowRight,
  Calculator,
} from "lucide-react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  addFeature,
  updateFeature,
  deleteFeature,
  getCategoryById,
  seedFeaturesToExistingCategories,
} from "@/lib/firestoreService";
import { BusinessCategory, Feature, categories as staticCategories } from "@/data/categories";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);
  
  // Form states
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  
  // Category form
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    icon: "",
    description: "",
    color: "from-blue-600 to-cyan-500",
  });
  
  // Feature form
  const [featureForm, setFeatureForm] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    totalCost: 0,
    icon: "📦",
    category: "core" as "core" | "addon" | "extra",
    days: 1,
  });

  // Bulk feature addition state
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkCategory, setBulkCategory] = useState<BusinessCategory | null>(null);
  const [bulkFeatures, setBulkFeatures] = useState<Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    totalCost: number;
    icon: string;
    category: "core" | "addon" | "extra";
    days: number;
  }>>([]);

  // Load categories
  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Sync features from local data to Firestore
  const handleSyncFeatures = async () => {
    try {
      setLoading(true);
      await seedFeaturesToExistingCategories(staticCategories);
      await loadCategories();
      toast.success("Features synced successfully!");
    } catch (error) {
      console.error("Error syncing features:", error);
      toast.error("Failed to sync features");
    } finally {
      setLoading(false);
    }
  };

  // Category CRUD
  const handleCreateCategory = async () => {
    try {
      await createCategory(categoryForm);
      setIsCategoryDialogOpen(false);
      setCategoryForm({ name: "", icon: "", description: "", color: "from-blue-600 to-cyan-500" });
      await loadCategories();
      toast.success("Category created successfully!");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    }
  };

  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;
    try {
      await updateCategory(selectedCategory.id, categoryForm);
      setIsCategoryDialogOpen(false);
      setSelectedCategory(null);
      setCategoryForm({ name: "", icon: "", description: "", color: "from-blue-600 to-cyan-500" });
      await loadCategories();
      toast.success("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Are you sure? This will delete the category and all its features.")) return;
    try {
      await deleteCategory(categoryId);
      await loadCategories();
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  // Feature CRUD
  const handleCreateFeature = async () => {
    if (!selectedCategory) return;
    try {
      const { id, ...featureData } = featureForm;
      await addFeature(selectedCategory.id, featureData);
      setIsFeatureDialogOpen(false);
      resetFeatureForm();
      await refreshCategory(selectedCategory.id);
      toast.success("Feature added successfully!");
    } catch (error) {
      console.error("Error creating feature:", error);
      toast.error("Failed to create feature");
    }
  };

  const handleUpdateFeature = async () => {
    if (!selectedCategory || !editingFeature) return;
    try {
      await updateFeature(selectedCategory.id, editingFeature.id, featureForm);
      setIsFeatureDialogOpen(false);
      setEditingFeature(null);
      setIsEditMode(false);
      resetFeatureForm();
      await refreshCategory(selectedCategory.id);
      toast.success("Feature updated successfully!");
    } catch (error) {
      console.error("Error updating feature:", error);
      toast.error("Failed to update feature");
    }
  };

  const handleDeleteFeature = async (categoryId: string, featureId: string) => {
    if (!confirm("Are you sure you want to delete this feature?")) return;
    try {
      await deleteFeature(categoryId, featureId);
      await refreshCategory(categoryId);
      toast.success("Feature deleted successfully!");
    } catch (error) {
      console.error("Error deleting feature:", error);
      toast.error("Failed to delete feature");
    }
  };

  const refreshCategory = async (categoryId: string) => {
    const updated = await getCategoryById(categoryId);
    if (updated) {
      setSelectedCategory(updated);
      setCategories(categories.map((c) => (c.id === categoryId ? updated : c)));
    }
  };

  const resetFeatureForm = () => {
    setFeatureForm({
      id: "",
      name: "",
      description: "",
      price: 0,
      totalCost: 0,
      icon: "📦",
      category: "core",
      days: 1,
    });
  };

  const openEditCategory = (category: BusinessCategory) => {
    setSelectedCategory(category);
    setCategoryForm({
      name: category.name,
      icon: category.icon,
      description: category.description,
      color: category.color,
    });
    setIsEditMode(true);
    setIsCategoryDialogOpen(true);
  };

  const openAddFeature = (category: BusinessCategory) => {
    setSelectedCategory(category);
    setIsEditMode(false);
    setEditingFeature(null);
    resetFeatureForm();
    setIsFeatureDialogOpen(true);
  };

  const openBulkAddFeatures = (category: BusinessCategory) => {
    setBulkCategory(category);
    setBulkFeatures([]);
    setIsBulkMode(true);
  };

  const addBulkFeatureRow = () => {
    setBulkFeatures([...bulkFeatures, {
      id: "",
      name: "",
      description: "",
      price: 0,
      totalCost: 0,
      icon: "📦",
      category: "core",
      days: 1,
    }]);
  };

  const removeBulkFeatureRow = (index: number) => {
    setBulkFeatures(bulkFeatures.filter((_, i) => i !== index));
  };

  const updateBulkFeature = (index: number, field: string, value: any) => {
    const updated = [...bulkFeatures];
    updated[index] = { ...updated[index], [field]: value };
    setBulkFeatures(updated);
  };

  const handleSaveBulkFeatures = async () => {
    if (!bulkCategory) return;
    
    // Validate: all features must have id and name
    const invalid = bulkFeatures.filter(f => !f.id.trim() || !f.name.trim());
    if (invalid.length > 0) {
      toast.error("All features must have an ID and Module Name");
      return;
    }

    try {
      setLoading(true);
      for (const feature of bulkFeatures) {
        await addFeature(bulkCategory.id, feature);
      }
      toast.success(`${bulkFeatures.length} features added successfully!`);
      setIsBulkMode(false);
      setBulkCategory(null);
      setBulkFeatures([]);
      await loadCategories();
    } catch (error) {
      console.error("Error saving bulk features:", error);
      toast.error("Failed to save features");
    } finally {
      setLoading(false);
    }
  };

  const bulkTotals = {
    price: bulkFeatures.reduce((sum, f) => sum + (f.price || 0), 0),
    totalCost: bulkFeatures.reduce((sum, f) => sum + (f.totalCost || 0), 0),
    days: bulkFeatures.reduce((sum, f) => sum + (f.days || 0), 0),
  };

  const openEditFeature = (category: BusinessCategory, feature: Feature) => {
    setSelectedCategory(category);
    setEditingFeature(feature);
    setFeatureForm({
      id: feature.id,
      name: feature.name,
      description: feature.description,
      price: feature.price,
      totalCost: feature.totalCost,
      icon: feature.icon,
      category: feature.category,
      days: feature.days,
    });
    setIsEditMode(true);
    setIsFeatureDialogOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePrintCategory = (category: BusinessCategory) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const allFeatures = category.sections.flatMap((s) => s.features);
    const totalMin = allFeatures.reduce((sum, f) => sum + f.price, 0);
    const totalMax = allFeatures.reduce((sum, f) => sum + f.totalCost, 0);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${category.name} - Features List</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
          h1 { color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px; }
          .header { background: linear-gradient(135deg, #1e40af, #06b6d4); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
          .header h2 { margin: 0; font-size: 24px; }
          .section { margin: 20px 0; }
          .section-title { background: #f1f5f9; padding: 10px; font-weight: bold; border-left: 4px solid #1e40af; }
          .feature { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #e2e8f0; }
          .feature-name { font-weight: 500; }
          .feature-price { color: #1e40af; font-weight: bold; }
          .summary { background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px; border: 2px solid #1e40af; }
          .summary-row { display: flex; justify-content: space-between; padding: 5px 0; }
          .total { font-size: 18px; font-weight: bold; color: #1e40af; border-top: 2px solid #1e40af; margin-top: 10px; padding-top: 10px; }
          .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>${category.icon} ${category.name}</h2>
          <p>${category.description}</p>
        </div>
        ${category.sections.map(section => `
          <div class="section">
            <div class="section-title">${section.title}</div>
            ${section.features.map(f => `
              <div class="feature">
                <span class="feature-name">${f.icon} ${f.name}</span>
                <span class="feature-price">₹${f.price.toLocaleString()} - ₹${f.totalCost.toLocaleString()}</span>
              </div>
            `).join('')}
          </div>
        `).join('')}
        <div class="summary">
          <div class="summary-row total">
            <span>Total Price Range:</span>
            <span>₹${totalMin.toLocaleString()} - ₹${totalMax.toLocaleString()}</span>
          </div>
          <div class="summary-row">
            <span>Total Features:</span>
            <span>${allFeatures.length}</span>
          </div>
        </div>
        <div class="footer">
          <p>Generated by BuildQuote Estimator</p>
          <p class="no-print"><button onclick="window.print()">Print this page</button></p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Bulk Mode Full Page UI - Simple Form
  if (isBulkMode && bulkCategory) {
    const totalPrice = bulkFeatures.reduce((sum, f) => sum + (f.price || 0), 0);
    const totalDuration = bulkFeatures.reduce((sum, f) => sum + (f.days || 0), 0);

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="gradient-hero py-6 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setIsBulkMode(false)}
              className="flex items-center gap-1.5 text-primary-foreground/60 hover:text-primary-foreground text-xs font-medium mb-3 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold text-primary-foreground tracking-tight">
                  Add Features: {bulkCategory.name}
                </h1>
                <p className="text-primary-foreground/60 text-xs md:text-sm">
                  Add multiple features with price calculation
                </p>
              </div>
              <Button
                onClick={handleSaveBulkFeatures}
                disabled={bulkFeatures.length === 0}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Save className="w-4 h-4 mr-2" /> Save All
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 md:px-8 py-6">
          {/* Feature Rows */}
          <div className="space-y-4">
            {bulkFeatures.length === 0 && (
              <div className="text-center py-12 bg-muted rounded-lg">
                <p className="text-muted-foreground mb-4">No features added yet</p>
              </div>
            )}

            {bulkFeatures.map((feature, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-4">
                  <div className="grid md:grid-cols-12 gap-4 items-end">
                    {/* Module Name */}
                    <div className="md:col-span-4">
                      <Label className="text-xs font-semibold mb-1.5 block">
                        {index + 1}. Module Name *
                      </Label>
                      <Input
                        value={feature.name}
                        onChange={(e) => updateBulkFeature(index, "name", e.target.value)}
                        placeholder="e.g., Appointment Booking"
                        className="h-10"
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-5">
                      <Label className="text-xs font-semibold mb-1.5 block">
                        Description
                      </Label>
                      <Input
                        value={feature.description}
                        onChange={(e) => updateBulkFeature(index, "description", e.target.value)}
                        placeholder="Feature description"
                        className="h-10"
                      />
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2">
                      <Label className="text-xs font-semibold mb-1.5 block">
                        Price (₹)
                      </Label>
                      <Input
                        type="number"
                        value={feature.price}
                        onChange={(e) => updateBulkFeature(index, "price", parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="h-10"
                      />
                    </div>

                    {/* Remove Button */}
                    <div className="md:col-span-1 flex justify-end">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeBulkFeatureRow(index)}
                        className="h-10 w-10 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Hidden fields for compatibility */}
                  <input type="hidden" value={feature.id} />
                  <input type="hidden" value={feature.totalCost} />
                  <input type="hidden" value={feature.icon} />
                  <input type="hidden" value={feature.category} />
                  <input type="hidden" value={feature.days} />
                </CardContent>
              </Card>
            ))}

            {/* Add [+] Button */}
            <Button
              onClick={addBulkFeatureRow}
              variant="outline"
              className="w-full h-12 border-dashed border-2 hover:border-primary"
            >
              <Plus className="w-5 h-5 mr-2" /> Add Feature
            </Button>
          </div>

          {/* Summary Section */}
          {bulkFeatures.length > 0 && (
            <Card className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5" /> Summary
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Total Price - Calculated */}
                  <div>
                    <Label className="text-xs font-semibold text-blue-700 mb-1.5 block">
                      4. Total Price (Auto-calculated)
                    </Label>
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{totalPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Sum of all feature prices
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <Label className="text-xs font-semibold text-blue-700 mb-1.5 block">
                      5. Duration (Days)
                    </Label>
                    <Input
                      type="number"
                      value={totalDuration}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        // Update days on the first feature (or distribute)
                        if (bulkFeatures.length > 0) {
                          updateBulkFeature(0, "days", val);
                        }
                      }}
                      className="h-12 text-lg bg-white"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Total project duration in days
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>{bulkFeatures.length}</strong> features | 
                    Total: <strong>₹{totalPrice.toLocaleString()}</strong> | 
                    Duration: <strong>{totalDuration} days</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-primary-foreground/60 hover:text-primary-foreground text-xs font-medium mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-primary-foreground tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-primary-foreground/60 text-xs md:text-sm">
                Manage categories and features
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setIsEditMode(false);
                  setSelectedCategory(null);
                  setCategoryForm({ name: "", icon: "", description: "", color: "from-blue-600 to-cyan-500" });
                  setIsCategoryDialogOpen(true);
                }}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Category
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No categories found</p>
            <p className="text-sm text-muted-foreground">Add a category to get started</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className={`bg-gradient-to-r ${category.color} text-white`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <CardTitle className="text-white text-lg">{category.name}</CardTitle>
                        <p className="text-white/70 text-xs mt-0.5">
                          {category.sections.reduce((acc, s) => acc + s.features.length, 0)} features
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handlePrintCategory(category)}
                        className="h-8 w-8 text-white hover:bg-white/20"
                        title="Print Category"
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEditCategory(category)}
                        className="h-8 w-8 text-white hover:bg-white/20"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="h-8 w-8 text-white hover:bg-white/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {category.sections.map((section, idx) => (
                      <AccordionItem key={idx} value={`section-${idx}`}>
                        <AccordionTrigger className="text-xs font-semibold py-2">
                          {section.title} ({section.features.length})
                        </AccordionTrigger>
                        <AccordionContent>
                          <ScrollArea className="h-40">
                            <div className="space-y-2">
                              {section.features.map((feature) => (
                                <div
                                  key={feature.id}
                                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                                >
                                  <div className="flex items-center gap-2">
                                    <span>{feature.icon}</span>
                                    <div>
                                      <p className="text-sm font-medium">{feature.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Price: ₹{feature.price.toLocaleString()} | Total: ₹{feature.totalCost.toLocaleString()} | {feature.days} days
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => openEditFeature(category, feature)}
                                      className="h-7 w-7"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => handleDeleteFeature(category.id, feature.id)}
                                      className="h-7 w-7 text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <Button
                    onClick={() => openBulkAddFeatures(category)}
                    variant="outline"
                    className="w-full mt-4"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Features
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="cat-name">Name</Label>
              <Input
                id="cat-name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="e.g., Salon Management"
              />
            </div>
            <div>
              <Label htmlFor="cat-icon">Icon (emoji)</Label>
              <Input
                id="cat-icon"
                value={categoryForm.icon}
                onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                placeholder="e.g., 💇"
              />
            </div>
            <div>
              <Label htmlFor="cat-desc">Description</Label>
              <Input
                id="cat-desc"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                placeholder="Short description"
              />
            </div>
            <div>
              <Label htmlFor="cat-color">Gradient Color</Label>
              <Select
                value={categoryForm.color}
                onValueChange={(v) => setCategoryForm({ ...categoryForm, color: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="from-blue-600 to-cyan-500">Blue</SelectItem>
                  <SelectItem value="from-violet-600 to-purple-500">Purple</SelectItem>
                  <SelectItem value="from-amber-500 to-orange-500">Orange</SelectItem>
                  <SelectItem value="from-emerald-600 to-teal-500">Green</SelectItem>
                  <SelectItem value="from-red-500 to-rose-500">Red</SelectItem>
                  <SelectItem value="from-pink-500 to-rose-400">Pink</SelectItem>
                  <SelectItem value="from-slate-500 to-gray-400">Gray</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={isEditMode ? handleUpdateCategory : handleCreateCategory}>
              <Save className="w-4 h-4 mr-2" />
              {isEditMode ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feature Dialog */}
      <Dialog open={isFeatureDialogOpen} onOpenChange={setIsFeatureDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Feature" : "Add Feature"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="feat-id">Feature ID</Label>
              <Input
                id="feat-id"
                value={featureForm.id}
                onChange={(e) => setFeatureForm({ ...featureForm, id: e.target.value })}
                placeholder="e.g., s-appointment"
                disabled={isEditMode}
              />
            </div>
            <div>
              <Label htmlFor="feat-name">Module Name</Label>
              <Input
                id="feat-name"
                value={featureForm.name}
                onChange={(e) => setFeatureForm({ ...featureForm, name: e.target.value })}
                placeholder="e.g., Appointment Booking"
              />
            </div>
            <div>
              <Label htmlFor="feat-desc">Description</Label>
              <Input
                id="feat-desc"
                value={featureForm.description}
                onChange={(e) => setFeatureForm({ ...featureForm, description: e.target.value })}
                placeholder="Feature description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="feat-price">Price (₹)</Label>
                <Input
                  id="feat-price"
                  type="number"
                  value={featureForm.price}
                  onChange={(e) => setFeatureForm({ ...featureForm, price: parseInt(e.target.value) || 0 })}
                  placeholder="Base price"
                />
              </div>
              <div>
                <Label htmlFor="feat-total">Total Cost (₹)</Label>
                <Input
                  id="feat-total"
                  type="number"
                  value={featureForm.totalCost}
                  onChange={(e) => setFeatureForm({ ...featureForm, totalCost: parseInt(e.target.value) || 0 })}
                  placeholder="Total cost"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="feat-icon">Icon (emoji)</Label>
                <Input
                  id="feat-icon"
                  value={featureForm.icon}
                  onChange={(e) => setFeatureForm({ ...featureForm, icon: e.target.value })}
                  placeholder="e.g., 📅"
                />
              </div>
              <div>
                <Label htmlFor="feat-days">Time Period (Days)</Label>
                <Input
                  id="feat-days"
                  type="number"
                  value={featureForm.days}
                  onChange={(e) => setFeatureForm({ ...featureForm, days: parseInt(e.target.value) || 1 })}
                  placeholder="Duration in days"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="feat-category">Category Type</Label>
              <Select
                value={featureForm.category}
                onValueChange={(v: "core" | "addon" | "extra") =>
                  setFeatureForm({ ...featureForm, category: v })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="addon">Add-On</SelectItem>
                  <SelectItem value="extra">Extra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFeatureDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={isEditMode ? handleUpdateFeature : handleCreateFeature}>
              <Save className="w-4 h-4 mr-2" />
              {isEditMode ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
