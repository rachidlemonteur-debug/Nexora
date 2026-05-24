import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Filter, Star, ChevronDown } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="flex-1 w-full bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex-1 max-w-3xl">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-4">Rechercher un service</h1>
            <div className="flex w-full items-center gap-2 rounded-full bg-white p-2 shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-emerald-500">
              <Search className="ml-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Ex: Développeur React, Logo minimaliste..."
                className="flex-1 border-0 bg-transparent px-2 py-2 text-slate-900 outline-none placeholder:text-slate-400"
              />
              <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-6">
                Chercher
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filtres
                </h2>
                <button className="text-xs text-emerald-600 font-medium">Réinitialiser</button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Catégorie</h3>
                  <div className="space-y-2">
                    {["Développement", "Design Graphique", "Marketing", "Rédaction", "Audio/Vidéo"].map((cat) => (
                      <label key={cat} className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Budget (FCFA)</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" placeholder="Min" className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-emerald-500" />
                    <input type="number" placeholder="Max" className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-emerald-500" />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Délai de livraison</h3>
                  <div className="space-y-2">
                    {["Express (24h)", "Jusqu'à 3 jours", "Jusqu'à 7 jours", "Peu importe"].map((time) => (
                      <label key={time} className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="radio" name="delivery" className="border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                        {time}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">124</span> services trouvés
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Trier par:</span>
                <button className="flex items-center font-medium text-slate-900 gap-1 hover:text-emerald-700">
                  Recommandé <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Link key={i} href={`/services/${i}`} className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                    <Image 
                      src={`https://picsum.photos/seed/${i * 20}/800/600`}
                      alt="Service thumbnail"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">F</div>
                      <span className="text-xs font-medium text-slate-600">Freelance Pro</span>
                      <span className="ml-auto flex items-center text-xs font-medium text-yellow-500">
                        <Star className="mr-1 h-3 w-3 fill-current" /> 4.8
                      </span>
                    </div>
                    <h3 className="font-medium text-slate-900 line-clamp-2 mb-4 group-hover:text-emerald-700 transition-colors">
                      Conception de votre identité visuelle et logo d&apos;entreprise
                    </h3>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 uppercase font-medium">À partir de</span>
                      <span className="font-semibold text-slate-900">50 000 FCFA</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="rounded-full">Charger plus de résultats</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
