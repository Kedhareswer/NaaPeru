"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Language } from "@/types/patient"

interface LanguageSelectorProps {
  languages: Language[]
  value: string
  onValueChange: (value: string) => void
}

export function LanguageSelector({ languages, value, onValueChange }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language | undefined>(
    languages.find((lang) => lang.code === value),
  )

  useEffect(() => {
    setSelectedLanguage(languages.find((lang) => lang.code === value))
  }, [value, languages])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <div className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            {selectedLanguage ? (
              <span>
                {selectedLanguage.name} <span className="text-slate-500">({selectedLanguage.nativeName})</span>
              </span>
            ) : (
              "Select language..."
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search languages..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {languages.map((language) => (
                <CommandItem
                  key={language.code}
                  value={language.code}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === language.code ? "opacity-100" : "opacity-0")} />
                  <div className="flex flex-col">
                    <span>{language.name}</span>
                    <span className="text-xs text-slate-500">{language.nativeName}</span>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {language.voiceSupported && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">Voice</span>
                    )}
                    {language.recognitionSupported && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">Speech</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
