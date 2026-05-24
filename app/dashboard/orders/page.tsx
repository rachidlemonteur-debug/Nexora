import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ShoppingBag } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">Mes Commandes</h1>
        <p className="text-sm text-slate-500">Suivez l&apos;évolution de vos projets en cours.</p>
      </div>

      <div className="space-y-4">
        <Card className="flex flex-col items-center justify-center py-12 text-center border-dashed">
          <ShoppingBag className="h-12 w-12 text-slate-300 mb-4" />
          <p className="font-medium text-slate-900">Aucune commande pour le moment</p>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            Vos futures commandes apparaîtront ici.
          </p>
          <Link href="/recherche">
            <Button variant="outline" className="mt-6 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
              Explorer les services
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
