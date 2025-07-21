"use client"

import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      const href = target.getAttribute("href")

      if (href && href.startsWith("#")) {
        e.preventDefault()
        const targetElement = document.querySelector(href)

        if (targetElement) {
          const headerHeight = 100 // Altura do header fixo
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      }
    }

    // Adicionar event listener para todos os links internos
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll)
      })
    }
  }, [])

  return null
}
