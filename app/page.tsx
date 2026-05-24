import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Star, ShieldCheck, Zap, Code, PenTool, TrendingUp, Megaphone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-900 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-emerald-900 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full bg-emerald-800/50 px-3 py-1 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20 mb-6">
            La marketplace 100% Afrique Francophone
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl max-w-4xl">
            Trouvez les meilleurs talents d&apos;Afrique, <span className="text-emerald-400">payez en toute sécurité</span>.
          </h1>
          <p className="mt-6 text-lg leading-8 text-emerald-100 max-w-2xl">
            Développeurs, designers, rédacteurs et marketeurs experts. Commandez en un clic et payez via Mobile Money avec notre système d&apos;escrow sécurisé.
          </p>
          
          <div className="mt-10 flex w-full max-w-2xl items-center gap-2 rounded-full bg-white p-2 shadow-xl focus-within:ring-2 focus-within:ring-emerald-500">
            <Search className="ml-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Ex: Création de logo, Application mobile..."
              className="flex-1 border-0 bg-transparent px-2 py-3 text-slate-900 outline-none placeholder:text-slate-400"
            />
            <Button size="lg" className="rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 h-12">
              Rechercher
            </Button>
          </div>
          
          <div className="mt-8 flex items-center gap-6 text-sm text-emerald-200">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Paiement sécurisé</span>
            <span className="flex items-center gap-2"><Zap className="h-4 w-4" /> Livraison rapide</span>
            <span className="flex items-center gap-2">⭐ Talents vérifiés</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-10">Explorez par catégorie</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[
              { name: "Développement Web", icon: Code },
              { name: "Design Graphique", icon: PenTool },
              { name: "Marketing Digital", icon: Megaphone },
              { name: "Rédaction & Traduction", icon: TrendingUp },
              // Repeated for grid filling mockup
              { name: "Vidéo & Animation", icon: Star },
              { name: "Consulting Business", icon: ShieldCheck },
              { name: "Assistance Virtuelle", icon: Zap },
              { name: "Audio & Musique", icon: Star }
            ].map((cat, i) => (
              <Link key={i} href="/recherche" className="group flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 transition-all hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:shadow-md">
                <div className="rounded-full bg-white dark:bg-slate-900 p-4 shadow-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:scale-110 transition-transform text-slate-700 dark:text-slate-300">
                  <cat.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Services à succès</h2>
            <Link href="/recherche" className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline">Voir tout →</Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Link href={`/services/example-${i}`} key={i} className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <Image 
                    src={`https://picsum.photos/seed/${i * 10}/800/600`}
                    alt="Service thumbnail"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-400">A</div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Amadou Sylla</span>
                    <span className="ml-auto flex items-center text-xs font-medium text-yellow-500">
                      <Star className="mr-1 h-3 w-3 fill-current" /> 4.9 (12)
                    </span>
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 line-clamp-2 mb-4 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    Je vais développer votre application web sur-mesure avec React et Node.js
                  </h3>
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-500 uppercase font-medium">À partir de</span>
                    <span className="font-semibold text-slate-900 dark:text-white">150 000 FCFA</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Mobile Money */}
      <section className="py-24 bg-emerald-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-800 blur-3xl opacity-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold mb-4">Payez et soyez payé localement.</h2>
            <p className="text-emerald-100 text-lg mb-8">
              Notre système d&apos;escrow est 100% compatible avec Orange Money, Wave, MTN et Moov. Votre argent est sécurisé jusqu&apos;à la livraison finale.
            </p>
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-white/10 rounded font-medium">Wave</span>
              <span className="px-4 py-2 bg-white/10 rounded font-medium">Orange Money</span>
              <span className="px-4 py-2 bg-white/10 rounded font-medium">MTN Mono</span>
            </div>
          </div>
          <div>
            <Button size="lg" className="bg-white text-emerald-950 hover:bg-slate-100 rounded-full h-14 px-8 text-lg font-semibold shadow-lg">
              Commencer un projet
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
