"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'

export default function DisclaimerPage() {
  const t = useTranslations('legal.disclaimer')

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title={t('title')} />
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('title')}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('lastUpdated')}: {new Date().toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <section>
                  <h3 className="font-semibold text-lg mb-2">{t('generalDisclaimer')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('generalDisclaimerText')}
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">{t('accuracyWarranty')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('accuracyWarrantyText')}
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">{t('dataPrivacy')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('dataPrivacyText')}
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">{t('liabilityLimitation')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('liabilityLimitationText')}
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">{t('professionalAdvice')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('professionalAdviceText')}
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">{t('thirdPartyLinks')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('thirdPartyLinksText')}
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">{t('intellectualProperty')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('intellectualPropertyText')}
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">{t('changesToTerms')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('changesToTermsText')}
                  </p>
                </section>

                <section className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{t('contactInfo')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('contactInfoText')}
                  </p>
                  <p className="text-sm text-primary mt-2">
                    📧 contact@globalutils.com
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
