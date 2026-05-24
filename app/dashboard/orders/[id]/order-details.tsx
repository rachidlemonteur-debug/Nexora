"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, orderBy, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Clock, Send, AlertCircle, Paperclip, X, CheckCheck } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Order {
  id: string;
  serviceId: string;
  clientId: string;
  freelanceId: string;
  amount: number;
  status: string;
  createdAt: any;
  title?: string;
}

interface Message {
  id: string;
  orderId: string;
  senderId: string;
  text: string;
  fileUrl?: string;
  createdAt: any;
  readAt?: any;
}

export function OrderDetails({ orderId }: { orderId: string }) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [orderLoading, setOrderLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);
        
        if (orderSnap.exists()) {
          const orderData = orderSnap.data() as Order;
          // Verify user is participant
          if (orderData.clientId !== user.uid && orderData.freelanceId !== user.uid) {
            setError("Accès non autorisé");
            setOrderLoading(false);
            return;
          }
          setOrder(orderData);
        } else {
          setError("Commande introuvable");
        }
      } catch (err: any) {
        console.error("Erreur commande:", err);
        setError("Erreur lors du chargement de la commande");
      } finally {
        setOrderLoading(false);
      }
    };

    fetchOrder();
  }, [user, loading, router, orderId]);

  useEffect(() => {
    if (!user || orderLoading || error) return;

    const messagesRef = collection(db, "orders", orderId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = [];
      const unreadToUpdate: string[] = [];

      snapshot.forEach((docSnap) => {
        const msg = docSnap.data() as Message;
        msgs.push(msg);
        
        if (msg.senderId !== user.uid && !msg.readAt) {
          unreadToUpdate.push(msg.id);
        }
      });
      setMessages(msgs);
      setTimeout(scrollToBottom, 50); // Small delay to let DOM update

      unreadToUpdate.forEach(async (id) => {
        try {
          const msgRef = doc(db, "orders", orderId, "messages", id);
          await updateDoc(msgRef, { readAt: serverTimestamp() });
        } catch (err) {
          console.error("Failed to mark as read", err);
        }
      });
    }, (err) => {
      console.error("Erreur messages:", err);
    });

    return () => unsubscribe();
  }, [user, orderLoading, error, orderId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !selectedFile) || !user || !order) return;

    setIsSending(true);
    try {
      const messagesRef = collection(db, "orders", orderId, "messages");
      const docRef = doc(messagesRef); // Auto-generate ID
      
      let fileUrl = undefined;
      if (selectedFile) {
        // Simulation d'upload
        fileUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedFile.name)}&background=random`;
      }
      
      await setDoc(docRef, {
        id: docRef.id,
        orderId,
        senderId: user.uid,
        text: newMessage.trim(),
        ...(fileUrl ? { fileUrl } : {}),
        createdAt: serverTimestamp()
      });
      
      setNewMessage("");
      setSelectedFile(null);
    } catch (err: any) {
      console.error("Erreur envoi message:", err);
    } finally {
      setIsSending(false);
    }
  };

  if (loading || orderLoading) {
    return <div className="p-8 text-center text-slate-500">Chargement de la commande...</div>;
  }

  if (error || !order || !user) {
    return (
      <div className="p-8">
        <Link href="/dashboard/orders" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 mb-4">
          <ArrowLeft className="h-4 w-4" /> Retour aux commandes
        </Link>
        <Card className="border-red-100 bg-red-50 text-red-700">
          <CardContent className="p-6 flex items-center gap-3">
            <AlertCircle className="h-5 w-5" />
            <p>{error || (!user ? "Utilisateur non connecté" : "Erreur inconnue")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isFreelance = user.uid === order.freelanceId;
  const otherPartyLabel = isFreelance ? "Client" : "Freelance";

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
      <div className="mb-6">
        <Link href="/dashboard/orders" className="text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 font-medium flex items-center gap-2 mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Commande #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
              <Clock className="h-4 w-4" /> 
              Créée le {order.createdAt?.toDate ? format(order.createdAt.toDate(), "d MMM yyyy", { locale: fr }) : "..."}
            </p>
          </div>
          <Badge className={
            order.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 border-0" : 
            order.status === "completed" ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-0" :
            "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 border-0"
          }>
            {order.status === "pending" ? "En attente" : order.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
        {/* Order Info Sidebar */}
        <div className="col-span-1 space-y-6 flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Détails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mb-1">Montant sécurisé</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{order.amount.toLocaleString("fr-FR")} FCFA</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">Bloqué en escrow</p>
              </div>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">{otherPartyLabel}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">ID: {isFreelance ? order.clientId.slice(0,8) : order.freelanceId.slice(0,8)}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isFreelance && order.status === "active" && (
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Livrer le travail
                </Button>
              )}
              {!isFreelance && order.status === "delivered" && (
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Valider la livraison
                </Button>
              )}
              <Button variant="outline" className="w-full text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
                Signaler un problème
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <Card className="col-span-1 lg:col-span-2 flex flex-col h-full overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 py-4 shrink-0">
            <CardTitle className="text-lg flex items-center gap-2">
              Discussion
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex flex-col flex-1 p-0 overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                  <p className="text-sm">Aucun message pour le moment.</p>
                  <p className="text-xs mt-1">Commencez à discuter avec votre {otherPartyLabel.toLowerCase()}.</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.senderId === user?.uid;
                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        isMe 
                          ? "bg-emerald-600 dark:bg-emerald-700 text-white rounded-tr-sm" 
                          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm shadow-sm"
                      }`}>
                        {msg.fileUrl && (
                          <div className="mb-2">
                            <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 underline text-sm break-all ${isMe ? "text-emerald-100" : "text-emerald-600 dark:text-emerald-400"}`}>
                              <Paperclip className="h-4 w-4 shrink-0" />
                              Fichier joint
                            </a>
                          </div>
                        )}
                        {msg.text && <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>}
                      </div>
                      <span className={`text-[10px] mt-1 px-1 flex items-center gap-1 text-slate-400 dark:text-slate-500 ${isMe ? "justify-end" : "justify-start"}`}>
                        {msg.createdAt?.toDate ? format(msg.createdAt.toDate(), "HH:mm", { locale: fr }) : "..."}
                        {isMe && (
                          <CheckCheck className={`h-3 w-3 ${msg.readAt ? "text-emerald-500 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600"}`} />
                        )}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
              {selectedFile && (
                <div className="mb-3 flex items-center justify-between p-2 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-sm rounded-md">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Paperclip className="h-4 w-4 shrink-0" />
                    <span className="truncate font-medium">{selectedFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-100 ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />
                <Button 
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSending}
                  className="shrink-0 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Joindre un fichier</span>
                </Button>
                <Input
                  type="text"
                  placeholder="Écrivez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500 dark:text-white"
                  disabled={isSending}
                />
                <Button 
                  type="submit" 
                  disabled={(!newMessage.trim() && !selectedFile) || isSending}
                  className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 shrink-0"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Envoyer</span>
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
