import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Logo />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © {new Date().getFullYear()} Carrefour. Todos los derechos reservados.
            </p>
        </div>
      </div>
    </footer>
  );
}
