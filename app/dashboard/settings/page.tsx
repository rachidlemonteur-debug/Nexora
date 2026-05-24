"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const { userData } = useAuth();
  
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">Paramètres du compte</h1>
        <p className="text-sm text-slate-500">Gérez vos informations personnelles et préférences.</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profil public</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nom complet</Label>
                <Input id="fullName" defaultValue={userData?.fullName || ""} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="country">Pays</Label>
                <Input id="country" defaultValue={userData?.country || ""} className="mt-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Biographie</Label>
              <Textarea id="bio" placeholder="Parlez-nous un peu de vous..." defaultValue={userData?.bio || ""} className="mt-2" />
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 mt-2">Enregistrer les modifications</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations de paiement (Mobile Money)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="momo">Numéro de retrait par défaut</Label>
              <div className="flex mt-2">
                <select className="rounded-l-md border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  <option>+225</option>
                  <option>+221</option>
                  <option>+237</option>
                </select>
                <Input id="momo" type="tel" placeholder="07 00 00 00 00" className="rounded-l-none" />
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 mt-2">Mettre à jour</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
