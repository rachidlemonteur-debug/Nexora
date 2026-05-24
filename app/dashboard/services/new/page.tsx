"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { LayoutDashboard, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewServicePage() {
  const router = useRouter();
  const { user, userData, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Développement Web",
    price: "",
    deliveryDays: "",
    revisions: "",
    description: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // redirect if not verified / no user
  React.useEffect(() => {
    if (!loading && (!user || (userData && !userData.roles.includes('freelance')))) {
      router.push('/dashboard');
    }
  }, [user, userData, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    
    try {
      const newServiceRef = doc(collection(db, "services"));
      await setDoc(newServiceRef, {
        id: newServiceRef.id,
        freelanceId: user.uid,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        deliveryDays: Number(formData.deliveryDays),
        revisions: Number(formData.revisions),
        thumbnailUrl: "https://picsum.photos/seed/" + newServiceRef.id + "/800/600",
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la publication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Chargement...</div>;

  return (
    <div className="flex-1 w-full bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Desktop - Simplified variant for nested routes */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 hidden md:block shrink-0">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors mb-6">
             <ArrowLeft className="h-4 w-4" /> Retour au Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
              {userData?.fullName?.charAt(0) || "F"}
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-tight line-clamp-1">{userData?.fullName || "Freelance"}</p>
              <p className="text-xs text-slate-500 font-medium">Freelance Pro</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-slate-900">Publier un service</h1>
          <p className="text-sm text-slate-500 mt-1">Détaillez votre offre pour attirer les meilleurs clients.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Titre du service</Label>
                <Input 
                  id="title" 
                  placeholder="Ex: Je vais développer votre site e-commerce" 
                  className="mt-2"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <p className="text-xs text-slate-500 mt-2">Soyez précis, c&apos;est ce qui apparaîtra dans les recherches.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <select 
                    id="category"
                    className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 mt-2"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Développement Web</option>
                    <option>Design Graphique</option>
                    <option>Marketing Digital</option>
                    <option>Rédaction & Traduction</option>
                    <option>Audio & Vidéo</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea 
                  id="description" 
                  placeholder="Décrivez précisément ce que vous incluez dans ce service..." 
                  className="mt-2 min-h-[150px]"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tarification & Livraison</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Prix (FCFA)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    placeholder="50000" 
                    className="mt-2"
                    required
                    min="1000"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryDays">Délai (jours)</Label>
                  <Input 
                    id="deliveryDays" 
                    type="number" 
                    placeholder="3" 
                    className="mt-2"
                    required
                    min="1"
                    value={formData.deliveryDays}
                    onChange={(e) => setFormData({...formData, deliveryDays: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="revisions">Révisions incluses</Label>
                  <Input 
                    id="revisions" 
                    type="number" 
                    placeholder="2" 
                    className="mt-2"
                    required
                    min="0"
                    value={formData.revisions}
                    onChange={(e) => setFormData({...formData, revisions: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? "Publication..." : "Publier le service"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
