"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from 'next-intl'

// Conversion factors to base unit (meter for length, kilogram for weight, etc.)
const conversionFactors = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.001,
  },
  temperature: {
    // Temperature requires special handling
  },
  area: {
    'square-meter': 1,
    'square-kilometer': 0.000001,
    'square-centimeter': 10000,
    'square-mile': 3.861e-7,
    'square-yard': 1.19599,
    'square-foot': 10.7639,
    acre: 0.000247105,
    hectare: 0.0001,
  },
  volume: {
    liter: 1,
    milliliter: 1000,
    'cubic-meter': 0.001,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    cup: 4.22675,
    'fluid-ounce': 33.814,
  },
}

const unitLabels = {
  length: {
    meter: 'Meters (m)',
    kilometer: 'Kilometers (km)',
    centimeter: 'Centimeters (cm)',
    millimeter: 'Millimeters (mm)',
    mile: 'Miles (mi)',
    yard: 'Yards (yd)',
    foot: 'Feet (ft)',
    inch: 'Inches (in)',
  },
  weight: {
    kilogram: 'Kilograms (kg)',
    gram: 'Grams (g)',
    milligram: 'Milligrams (mg)',
    pound: 'Pounds (lb)',
    ounce: 'Ounces (oz)',
    ton: 'Metric Tons (t)',
  },
  temperature: {
    celsius: 'Celsius (°C)',
    fahrenheit: 'Fahrenheit (°F)',
    kelvin: 'Kelvin (K)',
  },
  area: {
    'square-meter': 'Square Meters (m²)',
    'square-kilometer': 'Square Kilometers (km²)',
    'square-centimeter': 'Square Centimeters (cm²)',
    'square-mile': 'Square Miles (mi²)',
    'square-yard': 'Square Yards (yd²)',
    'square-foot': 'Square Feet (ft²)',
    acre: 'Acres',
    hectare: 'Hectares',
  },
  volume: {
    liter: 'Liters (L)',
    milliliter: 'Milliliters (mL)',
    'cubic-meter': 'Cubic Meters (m³)',
    gallon: 'Gallons (gal)',
    quart: 'Quarts (qt)',
    pint: 'Pints (pt)',
    cup: 'Cups',
    'fluid-ounce': 'Fluid Ounces (fl oz)',
  },
}

export function UnitConverter() {
  const t = useTranslations('tools.unitConverter')
  const [activeTab, setActiveTab] = React.useState('length')
  const [fromUnit, setFromUnit] = React.useState('meter')
  const [toUnit, setToUnit] = React.useState('foot')
  const [inputValue, setInputValue] = React.useState('1')
  const [result, setResult] = React.useState('')
  const [copied, setCopied] = React.useState(false)

  const convert = React.useCallback(() => {
    const value = parseFloat(inputValue)
    if (isNaN(value)) {
      setResult('')
      return
    }

    let convertedValue: number

    if (activeTab === 'temperature') {
      // Special handling for temperature
      let celsiusValue: number
      // Convert to Celsius first
      if (fromUnit === 'celsius') {
        celsiusValue = value
      } else if (fromUnit === 'fahrenheit') {
        celsiusValue = (value - 32) * 5/9
      } else { // kelvin
        celsiusValue = value - 273.15
      }

      // Convert from Celsius to target
      if (toUnit === 'celsius') {
        convertedValue = celsiusValue
      } else if (toUnit === 'fahrenheit') {
        convertedValue = (celsiusValue * 9/5) + 32
      } else { // kelvin
        convertedValue = celsiusValue + 273.15
      }
    } else {
      // Standard conversion using conversion factors
      const factors = conversionFactors[activeTab as keyof typeof conversionFactors] as Record<string, number>
      const baseValue = value / factors[fromUnit]
      convertedValue = baseValue * factors[toUnit]
    }

    // Format the result
    const formattedResult = convertedValue % 1 === 0
      ? convertedValue.toString()
      : convertedValue.toFixed(6).replace(/\.?0+$/, '')

    setResult(formattedResult)
  }, [activeTab, fromUnit, toUnit, inputValue])

  React.useEffect(() => {
    convert()
  }, [convert])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    const units = Object.keys(unitLabels[tab as keyof typeof unitLabels])
    setFromUnit(units[0])
    setToUnit(units[1])
  }

  const copyToClipboard = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const currentUnits = unitLabels[activeTab as keyof typeof unitLabels] as Record<string, string>

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="length">{t('length')}</TabsTrigger>
          <TabsTrigger value="weight">{t('weight')}</TabsTrigger>
          <TabsTrigger value="temperature">{t('temperature')}</TabsTrigger>
          <TabsTrigger value="area">{t('area')}</TabsTrigger>
          <TabsTrigger value="volume">{t('volume')}</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('from')}</label>
                  <Input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value"
                  />
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(currentUnits).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('to')}</label>
                  <Input
                    type="text"
                    value={result}
                    readOnly
                    placeholder="Result"
                    className="bg-muted"
                  />
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(currentUnits).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('result')}</p>
                  <p className="text-2xl font-bold">
                    {inputValue} {currentUnits[fromUnit]} = {result} {currentUnits[toUnit]}
                  </p>
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  disabled={!result}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 size-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 size-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
