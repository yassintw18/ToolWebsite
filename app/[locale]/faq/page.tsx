"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslations } from 'next-intl'

export default function FAQPage() {
  const t = useTranslations('faq')

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title={t('title')} />
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
              <p className="text-muted-foreground">{t('subtitle')}</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {/* General Questions */}
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{t('q1.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q1.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>{t('q2.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q2.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>{t('q3.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q3.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  {/* Privacy & Security */}
                  <AccordionItem value="item-4">
                    <AccordionTrigger>{t('q4.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q4.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>{t('q5.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q5.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>{t('q6.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q6.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  {/* Technical Questions */}
                  <AccordionItem value="item-7">
                    <AccordionTrigger>{t('q7.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q7.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger>{t('q8.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q8.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  {/* AI & Smart Tools */}
                  <AccordionItem value="item-9">
                    <AccordionTrigger>{t('q9.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q9.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-10">
                    <AccordionTrigger>{t('q10.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q10.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  {/* Business & Support */}
                  <AccordionItem value="item-11">
                    <AccordionTrigger>{t('q11.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q11.answer')}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-12">
                    <AccordionTrigger>{t('q12.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('q12.answer')}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">{t('contact.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('contact.description')}
                </p>
                <div className="flex gap-4 text-sm">
                  <a href="mailto:support@globalutils.com" className="text-primary hover:underline">
                    📧 support@globalutils.com
                  </a>
                  <a href="https://github.com/globalutils" className="text-primary hover:underline">
                    💻 GitHub
                  </a>
                  <a href="https://discord.gg/globalutils" className="text-primary hover:underline">
                    💬 Discord
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
