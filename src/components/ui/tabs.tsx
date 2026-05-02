import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
} | null>(null)

export function Tabs({ defaultValue, value, onValueChange, className, children }: any) {
  const [current, setCurrent] = React.useState(value || defaultValue)
  
  React.useEffect(() => {
    if (value !== undefined) setCurrent(value)
  }, [value])

  const handleValueChange = (val: string) => {
    setCurrent(val)
    if (onValueChange) onValueChange(val)
  }

  return (
    <TabsContext.Provider value={{ value: current, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children }: any) {
  return (
    <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500", className)}>
      {children}
    </div>
  )
}

export function TabsTrigger({ value, className, children }: any) {
  const context = React.useContext(TabsContext)
  const isSelected = context?.value === value

  return (
    <button
      type="button"
      onClick={() => context?.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        isSelected ? "bg-white text-slate-950 shadow-sm" : "hover:bg-slate-200/50 hover:text-slate-900",
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children }: any) {
  const context = React.useContext(TabsContext)
  if (context?.value !== value) return null
  return (
    <div className={cn("mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", className)}>
      {children}
    </div>
  )
}
