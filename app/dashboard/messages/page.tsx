import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">Messages</h1>
        <p className="text-sm text-slate-500">Échangez avec vos clients ou freelances.</p>
      </div>

      <Card className="flex flex-col items-center justify-center py-12 text-center border-dashed">
        <MessageSquare className="h-12 w-12 text-slate-300 mb-4" />
        <p className="font-medium text-slate-900">Aucun message</p>
        <p className="text-sm text-slate-500 mt-1 max-w-sm">
          Vous n&apos;avez pas encore de conversation en cours.
        </p>
      </Card>
    </div>
  );
}
