"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "client" as "client" | "freelance"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // 2. Create public profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        fullName: formData.fullName,
        bio: "",
        avatarUrl: "",
        country: "Non spécifié",
        roles: [formData.role],
        rating: 0,
        reviewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 3. Create private info in Firestore
      await setDoc(doc(db, "users", user.uid, "private", "info"), {
        email: formData.email,
        phone: "",
        mobileMoneyNumber: "",
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Une erreur s'est produite lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex w-full min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 font-display">
              Créer un compte
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Ou{" "}
              <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                connectez-vous à votre compte
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Nom complet</Label>
                  <div className="mt-2">
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      type="text" 
                      required 
                      placeholder="Jean Dupont"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Adresse email</Label>
                  <div className="mt-2">
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      autoComplete="email" 
                      required 
                      placeholder="vous@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="mt-2">
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      required 
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label>Je souhaite...</Label>
                  <div className="mt-3 flex gap-4">
                    <label className={`flex-1 relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${formData.role === 'client' ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600' : 'border-slate-300 bg-white'}`}>
                      <input type="radio" name="role" value="client" className="sr-only" checked={formData.role === 'client'} onChange={() => setFormData({...formData, role: 'client'})} />
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <span className={`block text-sm font-medium ${formData.role === 'client' ? 'text-emerald-900' : 'text-slate-900'}`}>Embaucher</span>
                          <span className={`mt-1 flex items-center text-xs ${formData.role === 'client' ? 'text-emerald-700' : 'text-slate-500'}`}>Trouver un talent</span>
                        </span>
                      </span>
                    </label>
                    <label className={`flex-1 relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${formData.role === 'freelance' ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600' : 'border-slate-300 bg-white'}`}>
                      <input type="radio" name="role" value="freelance" className="sr-only" checked={formData.role === 'freelance'} onChange={() => setFormData({...formData, role: 'freelance'})} />
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <span className={`block text-sm font-medium ${formData.role === 'freelance' ? 'text-emerald-900' : 'text-slate-900'}`}>Travailler</span>
                          <span className={`mt-1 flex items-center text-xs ${formData.role === 'freelance' ? 'text-emerald-700' : 'text-slate-500'}`}>Proposer mes services</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full text-base h-11" disabled={loading}>
                  {loading ? "Création en cours..." : "S'inscrire"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 relative w-0 bg-emerald-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-emerald-900 to-emerald-950 pointer-events-none" />
        <div className="relative z-10 px-12 text-center text-white max-w-2xl">
          <h2 className="text-4xl font-display font-bold mb-6">Protégez vos transactions</h2>
          <p className="text-xl text-emerald-100 mb-10 leading-relaxed">
            Rejoignez des milliers d&apos;entrepreneurs et de freelances qui font confiance à Freelancia pour leurs projets numériques.
          </p>
          <div className="grid grid-cols-2 gap-6 text-left">
            <div className="bg-emerald-800/50 p-6 rounded-xl border border-emerald-700/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-2">10k+</div>
              <div className="text-emerald-100 font-medium">Freelances vérifiés</div>
            </div>
            <div className="bg-emerald-800/50 p-6 rounded-xl border border-emerald-700/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-emerald-100 font-medium">Paiements sécurisés (Escrow)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
