"use client"

import Image from "next/image"

const navItems = [
  { label: "Cases", href: "#cases" },
  { label: "Who?", href: "#who" },
  { label: "Hit My Pager", href: "#contact" },
]

export function BottomNav() {
  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-3 bg-merino-white rounded-full px-4 py-3 shadow-lg">
        {/* SC Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/sc-logo.svg"
            alt="SC Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        {/* Nav Items */}
        <ul className="flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="
                  block px-3.5 py-1.5
                  bg-rustic-red text-merino-white
                  font-sans text-base font-medium uppercase
                  rounded-full
                  transition-colors duration-200 ease-out
                  hover:bg-ruby-red
                  focus:outline-none focus:ring-2 focus:ring-ruby-red focus:ring-offset-2 focus:ring-offset-merino-white
                "
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
