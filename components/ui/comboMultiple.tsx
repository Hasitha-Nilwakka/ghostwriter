"use client"

import * as React from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from "@/components/ui/combobox"

interface ComboboxMultipleProps {
  itemArray: string[]
  value?: string[]
  onChange?: (value: string[]) => void
  onBlur?: () => void
  disabled?: boolean
  maxSelections?: number
  placeholder?: string
}

export function ComboboxMultiple({
  itemArray,
  value = [],
  onChange,
  onBlur,
  disabled,
  maxSelections = 3,
  placeholder = "Select options..."
}: ComboboxMultipleProps) {
  const anchor = useComboboxAnchor()
  const isAtMax = value.length >= maxSelections

  return (
    <Combobox
      multiple
      autoHighlight
      items={itemArray}
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <ComboboxChips ref={anchor} className="w-full">
        <ComboboxValue>
          {(values: string[]) => (
            <React.Fragment>
              {values.map((item: string) => (
                <ComboboxChip key={item}>{item}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                onBlur={onBlur}
                placeholder={values.length === 0 ? placeholder : ""}
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => {
            const isSelected = value.includes(item)
            const shouldDisable = isAtMax && !isSelected

            return (
              <ComboboxItem
                key={item}
                value={item}
                disabled={shouldDisable}
              >
                {item}
              </ComboboxItem>
            )
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}