import Link from "next/link";
import Image from "next/image";
import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-muted">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to top, rgba(61,20,80,0.55), transparent)" }} />
      <div className="container-d relative border-t border-white/[0.06] py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-6">
            <Link href="/" aria-label="Digitales home" className="inline-block">
              <Image
                src="/Digitales logo.png"
                alt="Digitales"
                width={150}
                height={45}
                className="h-10 w-auto sm:h-12"
              />
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed">
              High-end strategy and technical precision for the modern digital era.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/share/1H4QkDYt9u/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white transition hover:border-gold hover:text-gold"
              >
                <FacebookLogo size={18} weight="bold" />
              </a>
              <a
                href="https://www.instagram.com/digitalespk?igsh=bWt5MXhjMnpqZWx2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white transition hover:border-gold hover:text-gold"
              >
                <InstagramLogo size={18} weight="bold" />
              </a>
              <a
                href="https://www.linkedin.com/company/digitalespk/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white transition hover:border-gold hover:text-gold"
              >
                <LinkedinLogo size={18} weight="bold" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-white">Capabilities</h3>
            <ul className="mt-5 space-y-3">
              <li><Link href="/about" className="font-body text-sm transition hover:text-gold">About</Link></li>
              <li><Link href="/services" className="font-body text-sm transition hover:text-gold">Services</Link></li>
              <li><Link href="/portfolio" className="font-body text-sm transition hover:text-gold">Portfolio</Link></li>
              <li><Link href="/free-audit" className="font-body text-sm transition hover:text-gold">Free Audit</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-white">Resources</h3>
            <ul className="mt-5 space-y-3">
              <li><Link href="/relief-os" className="font-body text-sm transition hover:text-gold">Relief OS</Link></li>
              <li><Link href="/dartx" className="font-body text-sm transition hover:text-gold">DartX</Link></li>
              <li><Link href="/contact" className="font-body text-sm transition hover:text-gold">Contact</Link></li>
              <li><Link href="/privacy-policy" className="font-body text-sm transition hover:text-gold">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-white">Newsletter</h3>
            <p className="mt-5 font-body text-sm leading-relaxed">Get the latest digital insights delivered to your inbox.</p>
            <form className="mt-4 flex overflow-hidden rounded-full border border-white/15">
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <input id="newsletter" type="email" placeholder="Email address" className="min-w-0 flex-1 bg-white/[0.04] px-4 py-2.5 font-body text-sm text-white placeholder:text-muted/60 focus:bg-white/[0.07] focus:outline-none" />
              <button type="submit" className="bg-gold px-5 py-2.5 font-body text-sm font-semibold text-purple-deep">Join</button>
            </form>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.06] pt-7 text-center font-body text-xs text-muted/60">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved. Built with precision.  ·  A Future Vision Advertising Company.
        </div>
      </div>
    </footer>
  );
}
