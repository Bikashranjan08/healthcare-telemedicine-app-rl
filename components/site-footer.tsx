import Link from "next/link"
import { useI18n } from "./i18n-provider"

export function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary" />
            <span className="font-semibold">Sehat Saathi Connect</span>
          </div>
          <p className="text-sm text-muted-foreground">{t.hero.subtitle}</p>
        </div>
        <div>
          <h4 className="mb-3 font-medium">Company</h4>
          <ul className="grid gap-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-medium">Resources</h4>
          <ul className="grid gap-2 text-sm">
            <li>
              <Link href="/blog" className="hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/find-doctor" className="hover:text-primary">
                Find a Doctor
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-medium">Legal</h4>
          <ul className="grid gap-2 text-sm">
            <li>
              <a className="hover:text-primary" href="#">
                Privacy
              </a>
            </li>
            <li>
              <a className="hover:text-primary" href="#">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Sehat Saathi Connect. {t.footer.rights}
          </span>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter">
              Twitter
            </a>
            <a href="#" aria-label="LinkedIn">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
