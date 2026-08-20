'use client'
import React, { useId, useState } from 'react'
import { IconType } from 'react-icons'
import { motion } from 'motion/react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  maxLength?: number
  icon: IconType
  description: string
}

export default function FloatingTextareaWithCount({
  label = '',
  maxLength = 150,
  icon,
  description,
  onChange,
  onBlur,
  name,
  value: controlledValue,
  ...props
}: FloatingTextareaProps) {
  const id = useId()
  const [focused, setFocused] = useState(false)
  
  const displayValue = String(controlledValue ?? '') 
  const isFloated = focused || displayValue.length > 0
  const Icon = icon

  return (
    <div className='w-full'>
      <div className='flex items-start gap-3 pb-1 w-full'>
        <Icon
          className={cn(
            'mt-5 size-4 shrink-0 transition-colors duration-300',
            isFloated ? 'text-primary-col' : 'text-form-gray'
          )}
        />
        <div className='relative flex-1'>
          <Textarea
            id={id}
            name={name}
            {...props}
            value={displayValue}
            maxLength={maxLength}
            onChange={(e) => {
              if (onChange) onChange(e) 
            }}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false)
              if (onBlur) onBlur(e)
            }}
            className='
              min-w-full
              min-h-0
              resize-none 
              rounded-none border-none 
              px-0 pb-0 pt-6
              text-sm 
              shadow-none 
              dark:bg-transparent 
              focus-visible:border-transparent 
              focus-visible:ring-0 
              focus-visible:ring-offset-0'
          />
          <Label
            htmlFor={id}
            className={cn(
              'pointer-events-none absolute left-0 cursor-text transition-all duration-300 ease-in-out text-left',
              isFloated
                ? 'top-0.5 text-sm text-primary-col font-bold'
                : 'top-5 text-sm text-form-gray font-semibold'
            )}
          >
            {label}
          </Label>
        </div>
      </div>

      {/* Animated bottom line */}
      <div className='relative h-px w-full'>
        <div className='absolute inset-0 bg-border' />
        <motion.div
          className='absolute inset-0 bg-primary'
          initial={false}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'center' }}
        />
      </div>
      <div className='flex justify-between'>
        <div>
          <p className='mt-1.5 text-sm text-form-gray-muted'>{description}</p>
        </div>
        {/* Character count using the unified value */}
        <p
          className={cn(
            'mt-1.5 text-right text-sm transition-colors',
            displayValue.length === maxLength
              ? 'text-primary'
              : 'text-form-gray-muted'
          )}
        >
          {displayValue.length}/{maxLength}
        </p>
      </div>
    </div>
  )
}
