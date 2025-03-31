import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description: string
  button?: ReactNode
}

export default function PageHeader({ title, description, button }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
      <div className="animate-fadeIn">
        <h1 className="text-3xl font-bold text-amber-200 font-display tracking-wide">{title}</h1>
        <p className="text-amber-300 font-handwriting text-lg">{description}</p>
      </div>
      {button && <div className="animate-fadeIn animation-delay-300">{button}</div>}
    </div>
  )
}

