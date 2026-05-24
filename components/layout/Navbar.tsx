"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Search, Menu, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  // On peut masquer certaines parties si on est dans le dashboard pour épurér
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full lg:max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-emerald-700 dark:text-emerald-500">
              Freelancia.
            </span>
          </Link>
          
          {!isDashboard && (
            <nav className="hidden md:flex gap-6">
              <Link href="/recherche" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                Trouver un freelance
              </Link>
              <Link href="/recherche" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                Explorer les services
              </Link>
            </nav>
          )}
        </div>

        {!isDashboard && (
          <div className="hidden flex-1 items-center justify-center px-8 md:flex">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="search"
                placeholder="Quel service recherchez-vous ?"
                className="h-9 w-full rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 pl-9 pr-4 text-sm outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all dark:text-slate-100"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Link href="/dashboard">
              <Button variant={isDashboard ? "outline" : "default"} className="rounded-full px-4 gap-2 border-emerald-200">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Mon Espace</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 md:block">
                Connexion
              </Link>
              <Link href="/login">
                <Button className="hidden md:inline-flex rounded-full px-6">
                  Devenir Freelance
                </Button>
              </Link>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu principal</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
