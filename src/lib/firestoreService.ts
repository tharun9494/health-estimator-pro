import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { Feature, FeatureSection, BusinessCategory } from "@/data/categories";

const CATEGORIES_COLLECTION = "categories";
const FEATURES_COLLECTION = "features";

// ============ CATEGORY OPERATIONS ============

export async function getAllCategories(): Promise<BusinessCategory[]> {
  const categoriesRef = collection(db, CATEGORIES_COLLECTION);
  const q = query(categoriesRef, orderBy("name"));
  const snapshot = await getDocs(q);
  
  const categories: BusinessCategory[] = [];
  
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const featuresSnapshot = await getDocs(
      collection(db, CATEGORIES_COLLECTION, docSnap.id, FEATURES_COLLECTION)
    );
    
    const features: Feature[] = [];
    featuresSnapshot.forEach((f) => {
      features.push({ id: f.id, ...f.data() } as Feature);
    });
    
    // Group features into sections
    const sectionsMap = new Map<string, Feature[]>();
    features.forEach((f) => {
      const sectionTitle = f.category === "core" 
        ? (f.id.startsWith("h-") ? "🏥 Core Modules" : 
           f.id.startsWith("bw-") ? "🌐 Core Pages" :
           f.id.startsWith("id-") ? "🏠 Core Modules" :
           f.id.startsWith("ec-") ? "🛒 Core Modules" :
           f.id.startsWith("g-") ? "🏋️ Core Modules" :
           f.id.startsWith("s-") ? "💇 Core Modules" :
           f.id.startsWith("r-") ? "🍽️ Core Modules" :
           f.id.startsWith("basic-") ? "🌐 Essential Pages" :
           "📦 Core Features")
        : f.category === "addon"
        ? "➕ Optional Add-Ons"
        : "⚙️ Extra Features";
      
      if (!sectionsMap.has(sectionTitle)) {
        sectionsMap.set(sectionTitle, []);
      }
      sectionsMap.get(sectionTitle)!.push(f);
    });
    
    const sections: FeatureSection[] = Array.from(sectionsMap.entries()).map(
      ([title, features]) => ({ title, features })
    );
    
    categories.push({
      id: docSnap.id,
      name: data.name,
      icon: data.icon,
      description: data.description,
      color: data.color,
      sections,
    } as BusinessCategory);
  }
  
  return categories;
}

export async function getCategoryById(id: string): Promise<BusinessCategory | null> {
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  const featuresSnapshot = await getDocs(
    collection(db, CATEGORIES_COLLECTION, id, FEATURES_COLLECTION)
  );
  
  const features: Feature[] = [];
  featuresSnapshot.forEach((f) => {
    features.push({ id: f.id, ...f.data() } as Feature);
  });
  
  // Group features into sections
  const sectionsMap = new Map<string, Feature[]>();
  features.forEach((f) => {
    const sectionTitle = f.category === "core" 
      ? (f.id.startsWith("h-") ? "🏥 Core Modules" : 
         f.id.startsWith("bw-") ? "🌐 Core Pages" :
         f.id.startsWith("id-") ? "🏠 Core Modules" :
         f.id.startsWith("ec-") ? "🛒 Core Modules" :
         f.id.startsWith("g-") ? "🏋️ Core Modules" :
         f.id.startsWith("s-") ? "💇 Core Modules" :
         f.id.startsWith("r-") ? "🍽️ Core Modules" :
         f.id.startsWith("basic-") ? "🌐 Essential Pages" :
         "📦 Core Features")
      : f.category === "addon"
      ? "➕ Optional Add-Ons"
      : "⚙️ Extra Features";
    
    if (!sectionsMap.has(sectionTitle)) {
      sectionsMap.set(sectionTitle, []);
    }
    sectionsMap.get(sectionTitle)!.push(f);
  });
  
  const sections: FeatureSection[] = Array.from(sectionsMap.entries()).map(
    ([title, features]) => ({ title, features })
  );
  
  return {
    id: docSnap.id,
    name: data.name,
    icon: data.icon,
    description: data.description,
    color: data.color,
    sections,
  } as BusinessCategory;
}

export async function createCategory(
  category: Omit<BusinessCategory, "id" | "sections">
): Promise<string> {
  const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), {
    ...category,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateCategory(
  id: string,
  updates: Partial<BusinessCategory>
): Promise<void> {
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteCategory(id: string): Promise<void> {
  // Delete all features first
  const featuresSnapshot = await getDocs(
    collection(db, CATEGORIES_COLLECTION, id, FEATURES_COLLECTION)
  );
  
  const batch = writeBatch(db);
  featuresSnapshot.forEach((f) => {
    batch.delete(f.ref);
  });
  await batch.commit();
  
  // Delete category
  await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
}

// ============ FEATURE OPERATIONS ============

export async function addFeature(
  categoryId: string,
  feature: Omit<Feature, "id">
): Promise<string> {
  const featuresRef = collection(db, CATEGORIES_COLLECTION, categoryId, FEATURES_COLLECTION);
  const docRef = await addDoc(featuresRef, {
    ...feature,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateFeature(
  categoryId: string,
  featureId: string,
  updates: Partial<Feature>
): Promise<void> {
  const docRef = doc(db, CATEGORIES_COLLECTION, categoryId, FEATURES_COLLECTION, featureId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteFeature(
  categoryId: string,
  featureId: string
): Promise<void> {
  const docRef = doc(db, CATEGORIES_COLLECTION, categoryId, FEATURES_COLLECTION, featureId);
  await deleteDoc(docRef);
}

export async function getFeaturesByCategory(categoryId: string): Promise<Feature[]> {
  const featuresRef = collection(db, CATEGORIES_COLLECTION, categoryId, FEATURES_COLLECTION);
  const snapshot = await getDocs(query(featuresRef, orderBy("name")));
  
  const features: Feature[] = [];
  snapshot.forEach((doc) => {
    features.push({ id: doc.id, ...doc.data() } as Feature);
  });
  
  return features;
}

// ============ BATCH OPERATIONS ============

export async function batchAddFeatures(
  categoryId: string,
  features: Omit<Feature, "id">[]
): Promise<void> {
  const batch = writeBatch(db);
  
  features.forEach((feature) => {
    const docRef = doc(collection(db, CATEGORIES_COLLECTION, categoryId, FEATURES_COLLECTION));
    batch.set(docRef, { ...feature, createdAt: Timestamp.now() });
  });
  
  await batch.commit();
}

// ============ INITIAL DATA SEED ============

export async function seedInitialData(categories: BusinessCategory[]): Promise<void> {
  for (const cat of categories) {
    // Check if category exists
    const existing = await getCategoryById(cat.id);
    if (existing) continue;

    // Create category
    const categoryRef = doc(db, CATEGORIES_COLLECTION, cat.id);
    await updateDoc(categoryRef, {
      name: cat.name,
      icon: cat.icon,
      description: cat.description,
      color: cat.color,
      createdAt: Timestamp.now(),
    }).catch(async () => {
      // If doc doesn't exist, create it
      await addDoc(collection(db, CATEGORIES_COLLECTION), {
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        color: cat.color,
        createdAt: Timestamp.now(),
      });
    });

    // Add all features
    const allFeatures = cat.sections.flatMap((s) => s.features);
    await batchAddFeatures(cat.id, allFeatures);
  }
}

// Seed features to existing categories (categories already exist in Firestore)
export async function seedFeaturesToExistingCategories(categories: BusinessCategory[]): Promise<void> {
  for (const cat of categories) {
    // Get existing features for this category
    const existingFeatures = await getFeaturesByCategory(cat.id);

    // Get all features from static data
    const staticFeatures = cat.sections.flatMap((s) => s.features);

    // Add only features that don't exist yet (by id)
    const existingIds = new Set(existingFeatures.map(f => f.id));
    const newFeatures = staticFeatures.filter(f => !existingIds.has(f.id));

    if (newFeatures.length > 0) {
      await batchAddFeatures(cat.id, newFeatures);
      console.log(`Added ${newFeatures.length} features to ${cat.name}`);
    }
  }
}

export const getAllFeatures = (category: BusinessCategory): Feature[] =>
  category.sections.flatMap((s) => s.features);

export { db };
