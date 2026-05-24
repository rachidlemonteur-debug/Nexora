import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WalletPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">Portefeuille</h1>
        <p className="text-sm text-slate-500">Gérez vos revenus et retraits via Mobile Money.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-emerald-600 text-white border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Wallet className="h-24 w-24" />
          </div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-lg font-medium text-emerald-100">Solde disponible</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-4xl font-display font-bold">0 FCFA</p>
            <Button className="mt-6 bg-white text-emerald-700 hover:bg-slate-100 font-semibold w-auto">
              Retirer mes fonds
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
              Fonds en attente (Escrow) 
              <Info className="h-4 w-4 text-slate-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display font-bold text-slate-900">0 FCFA</p>
            <p className="text-sm text-slate-500 mt-2">
              Paiements bloqués sur des commandes en cours de réalisation.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-lg font-bold text-slate-900 mb-4">Historique des transactions</h2>
      <Card>
        <CardContent className="p-8 text-center text-slate-500">
          Aucune transaction pour le moment.
        </CardContent>
      </Card>
    </div>
  );
}
