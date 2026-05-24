import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, RotateCcw, CheckCircle2, MessageSquare, ShieldCheck } from "lucide-react";

export default function ServiceDetailsPage() {
  return (
    <div className="flex-1 w-full bg-white">
      {/* Category breadcrumb */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/recherche" className="hover:text-emerald-700">Développement Web</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Création d&apos;application</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
              Je vais développer votre application web sur-mesure avec React et Node.js
            </h1>
            
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200">
              <div className="h-12 w-12 rounded-full overflow-hidden relative bg-slate-200">
                <Image src="https://picsum.photos/seed/avatar5/150/150" fill referrerPolicy="no-referrer" alt="Avatar" className="object-cover" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-lg">Amadou Sylla</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center text-yellow-500 font-medium">
                    <Star className="mr-1 h-4 w-4 fill-current" /> 4.9 (42 avis)
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" /> Top Talent Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 bg-slate-100 border border-slate-200">
              <Image 
                src="https://picsum.photos/seed/serviceimg/1200/800" 
                fill 
                referrerPolicy="no-referrer" 
                alt="Service preview"
                className="object-cover" 
              />
            </div>

            {/* Description */}
            <section className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">À propos de ce service</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Vous avez besoin d&apos;une application web performante, rapide et scalable ? En tant que développeur full-stack expérimenté, je vous accompagne de A à Z dans la conception et le développement de votre produit avec les technologies React, Next.js et Node.js.
              </p>
              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">Ce que vous obtenez :</h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Une interface UI/UX moderne (TailwindCSS)",
                  "Un code propre, structuré et optimisé SEO",
                  "Intégration d&apos;API tierces ou création d&apos;une API sur-mesure",
                  "Base de données sécurisée (Firebase ou PostgreSQL)",
                  "Déploiement sur Vercel/Render inclus"
                ].map((item, i) => (
                  <li key={i} className="flex flex-start gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky Pricing Sidebar */}
          <aside className="w-full lg:w-[400px]">
            <div className="sticky top-24">
              <Card className="border-emerald-500 shadow-xl overflow-hidden">
                <div className="p-1 bg-emerald-500 text-center text-xs font-bold text-white uppercase tracking-wider">
                  Offre Recommandée
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Standard</h3>
                      <p className="text-sm text-slate-500 mt-1">Application Web Complète (5 pages)</p>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600">300k FCFA</span>
                  </div>

                  <p className="text-sm text-slate-600 mb-6 border-l-2 border-emerald-200 pl-3">
                    Front-end React + Back-end basique + Base de données + Authentification. Code source inclus.
                  </p>

                  <div className="flex items-center gap-6 text-sm text-slate-700 font-medium mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      14 jours
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4 text-slate-400" />
                      3 Révisions
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {["Design responsive", "Intégration API", "Panel d&apos;administration basique", "Code source inclus"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {feature}
                      </li>
                    ))}
                  </ul>

                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 mb-3 h-12 text-base">
                    Commander ce service
                  </Button>
                  <Button variant="outline" size="lg" className="w-full h-12 text-slate-700 gap-2">
                    <MessageSquare className="h-4 w-4" /> Contacter le freelance
                  </Button>
                  
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium bg-slate-50 p-2 rounded-md">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Paiement sécurisé. Fonds débloqués après livraison.
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
