import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { notFound } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="Rentil home">
            <Logo />
          </Link>
        </div>
        <div
          className="relative overflow-hidden rounded-panel bg-teal-dark px-8 py-16 text-center"
          style={{
            backgroundImage:
              "radial-gradient(36rem 20rem at 85% -10%, rgba(24,118,128,0.5), transparent 60%)",
          }}
        >
          <p className="font-display text-6xl text-cream/60">404</p>
          <h1 className="mt-4 font-display text-3xl leading-tight tracking-tight text-cream">
            {notFound.title}
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-mist">{notFound.body}</p>
          <div className="mt-8">
            <ButtonLink href="/" variant="cream">
              {notFound.cta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </main>
  );
}
