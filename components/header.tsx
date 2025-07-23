"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Contato", href: "#contato" },
  ]

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)

    // Pequeno delay para permitir que o menu feche antes do scroll
    setTimeout(() => {
      const targetElement = document.querySelector(href)
      if (targetElement) {
        const headerHeight = 100
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center py-6">
          <div className="animate-fade-in-left">
            <button
              onClick={() => handleNavClick("#inicio")}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <Image
                src="/logo.png"
                alt="Jordanha Targino Advogada - Logo"
                width={50}
                height={50}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <h1 className="text-xl font-serif font-light text-gold-dark tracking-wide transition-colors duration-300">
                  Jordanha Targino
                </h1>
                <p className="text-xs text-gold-dark font-light tracking-[0.2em] uppercase">Advogada</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 animate-fade-in">
            {navigation.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-elegant hover:text-gold-dark transition-all duration-300 text-sm font-light tracking-wide uppercase relative group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-light transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="hidden md:block animate-fade-in-right">
            <button
              onClick={() => handleNavClick("#contato")}
              className="text-sm text-gold-dark hover:text-gold-medium transition-all duration-300 font-light tracking-wide uppercase border-b border-gold-light pb-1 relative group cursor-pointer"
            >
              Agendar consulta
              <span className="absolute inset-0 border border-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2 rounded"></span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden transition-transform duration-200 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-black-deep transition-transform duration-200 rotate-0" />
            ) : (
              <Menu className="h-6 w-6 text-black-deep transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? "max-h-96 pb-8 border-t border-gray-100 pt-8" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col space-y-6">
            {navigation.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-elegant hover:text-gold-dark transition-all duration-300 text-sm font-light tracking-wide uppercase transform hover:translate-x-2 text-left cursor-pointer"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: isMenuOpen ? "fade-in-left 0.5s ease-out forwards" : "none",
                }}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contato")}
              className="text-sm text-gold-dark hover:text-gold-medium transition-all duration-300 font-light tracking-wide uppercase transform hover:translate-x-2 text-left cursor-pointer"
            >
              Agendar Consulta
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
