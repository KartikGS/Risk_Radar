'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Model', href: '/base-llm' },
  { name: 'Training', href: '/training' },
  { name: 'Fine-tuning', href: '/fine-tuning' },
  { name: 'Tools', href: '/tools' },
  { name: 'RAG', href: '/rag' },
  { name: 'Agents', href: '/agents' },
  { name: 'MCP', href: '/mcps' },
  { name: 'Deployment', href: '/deployment' },
  { name: 'Safety', href: '/safety' },
  { name: 'Evaluation', href: '/evaluation' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="h-full w-64 border-r border-black/[.08] dark:border-white/[.145] bg-white/[.8] dark:bg-black/[.8] backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b border-black/[.08] dark:border-white/[.145]">
        <Link
          href="/"
          className="text-xl font-semibold px-3 py-2 rounded-md hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors block"
        >
          LLM Journey
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <div className="flex flex-col space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-black/[.05] dark:bg-white/[.06] text-foreground'
                    : 'text-foreground/70 hover:text-foreground hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
