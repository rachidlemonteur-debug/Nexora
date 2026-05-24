"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Wallet, CircleCheck, Clock, Plus, MessageSquare } from "lucide-react";
import React, { useEffect } from "react";

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="p-8 text-center text-slate-500 flex-1">Chargement de votre espace...</div>;
  }

  const isFreelance = userData?.roles?.includes("freelance");

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Tableau de bord</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Bienvenue {userData?.fullName}, voici le résumé de votre activité.</p>
        </div>
        {isFreelance && (
          <Link href="/dashboard/services/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 gap-2">
              <Plus className="h-4 w-4" /> Publier un service
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Solde disponible</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">0 FCFA</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">En attente (Escrow)</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">0 FCFA</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Commandes actives</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
              <CircleCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Taux de complétion</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">--</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Orders */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Commandes récentes</h2>
          <Card className="flex flex-col items-center justify-center py-12 text-center border-dashed">
            <ShoppingBag className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
            <p className="font-medium text-slate-900 dark:text-slate-100">Aucune commande en cours</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              {isFreelance 
                ? "Publiez votre premier service pour commencer à recevoir des offres." 
                : "Explorez notre catalogue et trouvez le freelance parfait pour votre projet."}
            </p>
            <Link href={isFreelance ? "/dashboard/services/new" : "/recherche"}>
              <Button variant="outline" className="mt-6 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950">
                {isFreelance ? "Créer un service" : "Explorer les services"}
              </Button>
            </Link>
          </Card>
        </div>

        {/* Notifications / Messages */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Messages</h2>
          <Card>
            <CardContent className="p-8 text-center flex flex-col items-center justify-center">
              <MessageSquare className="h-10 w-10 text-slate-200 dark:text-slate-700 mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Aucun message de vos collaborateurs.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

