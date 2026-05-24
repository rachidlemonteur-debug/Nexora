"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Identifiants incorrects ou utilisateur introuvable.");
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
              Bon retour !
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Ou{" "}
              <Link href="/register" className="font-medium text-emerald-600 hover:text-emerald-500">
                créez un compte gratuitement
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
              <form onSubmit={handleLogin} className="space-y-6">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="text-sm">
                      <Link href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                        Mot de passe oublié ?
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      autoComplete="current-password" 
                      required 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full text-base h-11" disabled={loading}>
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-slate-50 px-2 text-slate-500">Sécurité garantie</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center text-slate-500 text-sm gap-2 items-center bg-white border border-emerald-100 p-4 rounded-lg shadow-sm">
                 <ShieldCheck className="h-5 w-5 text-emerald-600" />
                 Vos données sont chiffrées selon les standards bancaires.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 relative w-0 bg-emerald-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-emerald-900 to-emerald-950 pointer-events-none" />
        <div className="relative z-10 px-12 text-center text-white max-w-2xl">
          <h2 className="text-4xl font-display font-bold mb-6">Le talent africain à portée de clic</h2>
          <p className="text-xl text-emerald-100 mb-10 leading-relaxed">
            Rejoignez des milliers d&apos;entrepreneurs et de freelances qui font confiance à Freelancia pour leurs projets numériques, avec des paiements 100% sécurisés via Mobile Money.
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
