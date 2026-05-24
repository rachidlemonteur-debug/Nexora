import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock, CreditCard, Smartphone } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="flex-1 w-full bg-slate-50 py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-slate-900">Finaliser la commande</h1>
          <p className="text-sm text-slate-500 mt-2">Votre paiement est sécurisé. Le freelance ne sera payé qu&apos;après votre validation.</p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-8">
          
          {/* Payment Form */}
          <div className="flex-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-sm">1</span>
                  Méthode de paiement
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <label className="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4 text-center">
                    <input type="radio" name="payment" className="sr-only" defaultChecked />
                    <Smartphone className="mb-2 h-8 w-8 text-emerald-600" />
                    <span className="font-bold text-emerald-900">Mobile Money</span>
                    <span className="text-xs text-emerald-600 font-medium mt-1">Wave, Orange, MTN, Moov</span>
                  </label>
                  
                  <label className="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-slate-200 bg-white p-4 text-center hover:border-slate-300">
                    <input type="radio" name="payment" className="sr-only" />
                    <CreditCard className="mb-2 h-8 w-8 text-slate-400" />
                    <span className="font-bold text-slate-700">Carte Bancaire</span>
                    <span className="text-xs text-slate-500 font-medium mt-1">Visa, Mastercard</span>
                  </label>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <div>
                    <Label htmlFor="phone">Numéro Mobile Money</Label>
                    <div className="mt-2 flex">
                      <select className="rounded-l-md border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500">
                        <option>+225</option>
                        <option>+221</option>
                        <option>+237</option>
                      </select>
                      <Input id="phone" type="tel" placeholder="07 00 00 00 00" className="rounded-l-none" />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Vous recevrez une notification push pour valider le paiement.</p>
                  </div>
                </div>

              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-sm">2</span>
                  Briefing (Optionnel)
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="brief">Instructions pour le freelance</Label>
                    <textarea 
                      id="brief" 
                      rows={4} 
                      className="mt-2 flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Détaillez vos attentes, liens utiles, charte graphique..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button size="lg" className="w-full sm:w-auto px-8 bg-emerald-600 hover:bg-emerald-700 h-14 text-lg">
                Payer 315 000 FCFA <Lock className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <aside className="w-full lg:w-96 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Résumé de la commande</h3>
                  
                  <div className="flex gap-4 mb-6">
                    <div className="h-16 w-20 bg-slate-200 rounded-md overflow-hidden relative shrink-0">
                      <Image src="https://picsum.photos/seed/thumb/100/100" alt="" fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 text-sm line-clamp-2">Application Web Complète (Standard)</h4>
                      <p className="text-xs text-slate-500 mt-1">Par Amadou Sylla</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>Sous-total</span>
                      <span className="font-medium text-slate-900">300 000 F</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Frais de protection (5%)</span>
                      <span className="font-medium text-slate-900">15 000 F</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Total</span>
                      <span className="font-display text-2xl font-bold text-emerald-600">315 000 F</span>
                    </div>
                    <p className="text-xs text-slate-500 text-right mt-1">TTC en FCFA</p>
                  </div>

                  <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4">
                    <div className="flex gap-3">
                      <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
                      <div>
                        <h5 className="font-bold text-emerald-900 text-sm mb-1">Garantie Escrow</h5>
                        <p className="text-xs text-emerald-800 leading-relaxed">
                          Le montant est bloqué en sécurité sur Freelancia. Il ne sera versé au freelance qu&apos;après votre confirmation de réception du travail.
                        </p>
                      </div>
                    </div>
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
