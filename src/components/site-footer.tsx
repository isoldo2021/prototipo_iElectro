import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Carrefour. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/help" className="hover:text-foreground">Ayuda</Link>
            <Link href="/faq" className="hover:text-foreground">Preguntas Frecuentes</Link>
            <Link href="#" className="hover:text-foreground">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
