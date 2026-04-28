import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'

interface AdBannerProps {
  position: "top" | "bottom"
  className?: string
}

export function AdBanner({ position, className }: AdBannerProps) {
  const t = useTranslations('adBanner')
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  return (
    <div
      className={cn(
        "flex items-center justify-center border-border bg-muted/30 py-2",
        position === "top" ? "border-b" : "border-t",
        className
      )}
    >
      <div className="w-full px-4">
        {adSenseId ? (
          // Production: Real AdSense ads
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={adSenseId}
            data-ad-slot={position === 'top' ? 'top-banner' : 'bottom-banner'}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        ) : (
          // Development: Placeholder ad space
          <div className="mx-auto flex max-w-4xl items-center justify-center">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="text-xs uppercase tracking-wider">{t('advertisement')}</span>
              <div className="h-16 w-[728px] max-w-full rounded border border-dashed border-border bg-muted/50 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  {position === "top" ? "Top Banner Ad Space (728x90)" : "Bottom Banner Ad Space (728x90)"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
