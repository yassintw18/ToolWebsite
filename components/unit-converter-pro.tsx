"use client"

import * as React from "react"
import { Copy, Check, Ruler, ArrowRight, Repeat2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UnitConverter() {
  const [category, setCategory] = React.useState<'length' | 'weight' | 'temperature'>('length')
  const [fromUnit, setFromUnit] = React.useState('meter')
  const [toUnit, setToUnit] = React.useState('foot')
  const [fromValue, setFromValue] = React.useState('1')
  const [toValue, setToValue] = React.useState('3.28084')
  const [copied, setCopied] = React.useState(false)

  const lengthUnits = [
    { value: 'meter', label: 'Meter', ratio: 1 },
    { value: 'kilometer', label: 'Kilometer', ratio: 0.001 },
    { value: 'centimeter', label: 'Centimeter', ratio: 100 },
    { value: 'millimeter', label: 'Millimeter', ratio: 1000 },
    { value: 'mile', label: 'Mile', ratio: 0.000621371 },
    { value: 'yard', label: 'Yard', ratio: 1.09361 },
    { value: 'foot', label: 'Foot', ratio: 3.28084 },
    { value: 'inch', label: 'Inch', ratio: 39.3701 },
  ]

  const weightUnits = [
    { value: 'kilogram', label: 'Kilogram', ratio: 1 },
    { value: 'gram', label: 'Gram', ratio: 1000 },
    { value: 'milligram', label: 'Milligram', ratio: 1000000 },
    { value: 'pound', label: 'Pound', ratio: 2.20462 },
    { value: 'ounce', label: 'Ounce', ratio: 35.274 },
    { value: 'ton', label: 'Ton', ratio: 0.001 },
  ]

  const temperatureUnits = [
    { value: 'celsius', label: 'Celsius' },
    { value: 'fahrenheit', label: 'Fahrenheit' },
    { value: 'kelvin', label: 'Kelvin' },
  ]

  const getUnits = () => {
    switch (category) {
      case 'length':
        return lengthUnits
      case 'weight':
        return weightUnits
      case 'temperature':
        return temperatureUnits
      default:
        return lengthUnits
    }
  }

  const convert = () => {
    const fromVal = parseFloat(fromValue)
    if (isNaN(fromVal)) {
      setToValue('Invalid')
      return
    }

    if (category === 'temperature') {
      let result
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        result = (fromVal * 9/5) + 32
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        result = fromVal + 273.15
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        result = (fromVal - 32) * 5/9
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        result = (fromVal - 32) * 5/9 + 273.15
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        result = fromVal - 273.15
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        result = (fromVal - 273.15) * 9/5 + 32
      } else {
        result = fromVal
      }
      setToValue(result.toFixed(2))
    } else {
      const units = getUnits()
      const fromRatio = units.find(u => u.value === fromUnit)?.ratio || 1
      const toRatio = units.find(u => u.value === toUnit)?.ratio || 1
      const baseValue = fromVal / fromRatio
      const result = baseValue * toRatio
      setToValue(result.toFixed(6))
    }
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
    if (toValue !== 'Invalid') {
      setFromValue(toValue)
      convert()
    }
  }

  React.useEffect(() => {
    convert()
  }, [fromUnit, toUnit, category])

  const copyResult = async () => {
    await navigator.clipboard.writeText(toValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
            <Ruler className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Unit Converter
            </h1>
            <p className="text-sm text-muted-foreground">Convert between different units of measurement</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={category} onValueChange={(v) => setCategory(v as any)} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="length" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600">
            📏 Length
          </TabsTrigger>
          <TabsTrigger value="weight" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600">
            ⚖️ Weight
          </TabsTrigger>
          <TabsTrigger value="temperature" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600">
            🌡️ Temperature
          </TabsTrigger>
        </TabsList>

        <TabsContent value="length" className="mt-6">
          <ConverterContent
            units={lengthUnits}
            fromUnit={fromUnit}
            setFromUnit={setFromUnit}
            toUnit={toUnit}
            setToUnit={setToUnit}
            fromValue={fromValue}
            setFromValue={setFromValue}
            toValue={toValue}
            onConvert={convert}
            onSwap={swapUnits}
            onCopy={copyResult}
            copied={copied}
          />
        </TabsContent>

        <TabsContent value="weight" className="mt-6">
          <ConverterContent
            units={weightUnits}
            fromUnit={fromUnit}
            setFromUnit={setFromUnit}
            toUnit={setToUnit}
            setToUnit={setToUnit}
            fromValue={fromValue}
            setFromValue={setFromValue}
            toValue={toValue}
            onConvert={convert}
            onSwap={swapUnits}
            onCopy={copyResult}
            copied={copied}
          />
        </TabsContent>

        <TabsContent value="temperature" className="mt-6">
          <ConverterContent
            units={temperatureUnits}
            fromUnit={fromUnit}
            setFromUnit={setFromUnit}
            toUnit={setToUnit}
            setToUnit={setToUnit}
            fromValue={fromValue}
            setFromValue={setFromValue}
            toValue={toValue}
            onConvert={convert}
            onSwap={swapUnits}
            onCopy={copyResult}
            copied={copied}
          />
        </TabsContent>
      </Tabs>

      {/* Quick Presets */}
      <Card className="shadow-lg border-2">
        <div className="p-4 border-b bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
          <h3 className="font-semibold">Common Conversions</h3>
        </div>
        <CardContent className="p-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Button
              onClick={() => {
                setCategory('length')
                setFromUnit('foot')
                setToUnit('meter')
                setFromValue('1')
              }}
              variant="outline"
              className="justify-start"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              1 Foot → Meters
            </Button>
            <Button
              onClick={() => {
                setCategory('length')
                setFromUnit('mile')
                setToUnit('kilometer')
                setFromValue('1')
              }}
              variant="outline"
              className="justify-start"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              1 Mile → Kilometers
            </Button>
            <Button
              onClick={() => {
                setCategory('weight')
                setFromUnit('pound')
                setToUnit('kilogram')
                setFromValue('1')
              }}
              variant="outline"
              className="justify-start"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              1 Pound → Kilograms
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ConverterContent({
  units,
  fromUnit,
  setFromUnit,
  toUnit,
  setToUnit,
  fromValue,
  setFromValue,
  toValue,
  onConvert,
  onSwap,
  onCopy,
  copied
}: any) {
  return (
    <Card className="shadow-lg border-2">
      <CardContent className="p-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* From */}
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={fromValue}
              onChange={(e) => {
                setFromValue(e.target.value)
                onConvert()
              }}
              placeholder="Enter value"
              className="text-lg"
            />
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center">
            <Button onClick={onSwap} variant="outline" size="icon" className="rounded-full">
              <Repeat2 className="w-4 h-4" />
            </Button>
          </div>

          {/* To */}
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={toValue}
              readOnly
              placeholder="Result"
              className="text-lg font-mono bg-muted/30"
            />
          </div>
        </div>

        <Button onClick={onCopy} className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Result
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
