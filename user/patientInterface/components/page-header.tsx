import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backLink?: string
}

export default function PageHeader({ title, subtitle, backLink = "/" }: PageHeaderProps) {
  return (
    <header className="bg-[#006d5a] text-white p-6">
      <div className="container mx-auto">
        <div className="flex items-center">
          {backLink && (
            <Link href={backLink}>
              <Button
                variant="ghost"
                className="bg-white/20 text-white hover:bg-white/30 border-2 border-white p-2 mr-4"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </Link>
          )}
          <div className="flex items-center gap-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%80%81%20%E5%AE%89%20%281%29-Zd1KJvDG6iqfDnMf6fKwKt413jI60I.png"
              alt="Wellness Companion Logo"
              className="h-10 w-10 object-contain bg-white rounded-lg p-1"
            />
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              {subtitle && <p className="text-lg text-white/80">{subtitle}</p>}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

