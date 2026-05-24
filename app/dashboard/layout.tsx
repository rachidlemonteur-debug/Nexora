"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { LayoutDashboard, ShoppingBag, MessageSquare, Wallet, Settings, Briefcase } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, userData, loading } = useAuth();
  const pathname = usePathname() || "";

  // Omit sidebar for new service page
  if (pathname === '/dashboard/services/new') return <>{children}</>;

  const isFreelance = userData?.roles?.includes("freelance");
  const userName = loading ? "..." : (userData?.fullName || "Utilisateur");
  const userRole = loading ? "..." : (isFreelance ? "Freelance" : "Client");
  const userInitials = loading ? "" : (userData?.fullName?.charAt(0) || user?.email?.charAt(0) || "U");

  const navLinks = [
    { name: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard, isActive: pathname === '/dashboard' },
    { name: "Commandes", href: "/dashboard/orders", icon: ShoppingBag, isActive: pathname.startsWith('/dashboard/orders') },
    ...(isFreelance ? [{ name: "Mes Services", href: "/dashboard/services", icon: Briefcase, isActive: pathname.startsWith('/dashboard/services') }] : []),
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare, isActive: pathname.startsWith('/dashboard/messages') },
    { name: "Portefeuille", href: "/dashboard/wallet", icon: Wallet, isActive: pathname.startsWith('/dashboard/wallet') },
    { name: "Paramètres", href: "/dashboard/settings", icon: Settings, isActive: pathname.startsWith('/dashboard/settings') },
  ];

  return (
    <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row relative">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col sticky top-16 h-[calc(100vh-64px)] z-10 shrink-0">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold uppercase shrink-0">
              {userInitials}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-slate-900 dark:text-white leading-tight truncate">{userName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium capitalize truncate">{userRole}</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                    link.isActive 
                      ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 shadow-sm border border-emerald-100/50 dark:border-emerald-800/50' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${link.isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} /> 
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 pb-20 md:pb-0 relative">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 px-2 pt-2 pb-4 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] dark:shadow-none overflow-x-auto">
        <div className="flex items-center justify-around pb-2 min-w-max px-2">
           {navLinks.map((link) => {
             const Icon = link.icon;
             return (
               <Link 
                 key={link.href} 
                 href={link.href} 
                 className={`flex flex-col items-center gap-1 p-2 min-w-[70px] transition-colors ${
                   link.isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                 }`}
               >
                 <Icon className={`h-5 w-5 ${link.isActive ? 'fill-emerald-50 dark:fill-emerald-900/30' : ''}`} />
                 <span className="text-[10px] font-medium leading-none text-center truncate w-full">{link.name}</span>
               </Link>
             );
          })}
        </div>
      </nav>
    </div>
  );
}

