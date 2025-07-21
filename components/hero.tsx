"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleContactClick = () => {
    const targetElement = document.querySelector("#contato")
    if (targetElement) {
      const headerHeight = 100
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="inicio" className="pt-32 pb-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="max-w-2xl">
            <div
              className={`mb-8 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-sm text-gold-dark font-light tracking-[0.2em] uppercase mb-4 animate-fade-in-left">
                Direito Previdenciário
              </p>
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-serif font-extralight text-black-deep leading-[0.9] mb-8 tracking-tight transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <span className="inline-block animate-fade-in font-light" style={{ animationDelay: "0.2s" }}>
                Especialista em
              </span>
              <span
                className="block text-gold-dark italic font-light animate-fade-in-left"
                style={{ animationDelay: "0.4s" }}
              >
                BPC/LOAS
              </span>
              <span
                className="block text-gray-elegant font-extralight animate-fade-in-right"
                style={{ animationDelay: "0.6s" }}
              >
                & Aposentadoria
              </span>
            </h1>

            <div
              className={`w-16 h-px bg-gold-light mb-8 transition-all duration-1000 ease-out ${
                isVisible ? "animate-draw-line" : "w-0"
              }`}
              style={{ animationDelay: "0.8s" }}
            ></div>

            <p
              className={`text-lg text-gray-elegant leading-relaxed mb-12 font-light transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: "1s" }}
            >
              Advogada especializada em benefícios do INSS com atendimento em todo o Brasil.
              <span className="font-normal text-black-deep"> Conquiste seus direitos com quem entende do assunto.</span>
            </p>

            <div className="space-y-3 text-sm text-gray-elegant mb-16 font-light">
              {[
                "BPC/LOAS para idosos e pessoas com deficiência",
                "Aposentadoria por idade, tempo e invalidez",
                "Revisão de benefícios do INSS",
                "Atendimento em todo território nacional",
              ].map((item, index) => (
                <p
                  key={index}
                  className={`flex items-center transition-all duration-500 ease-out hover:translate-x-2 hover:text-gold-dark ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  <span className="w-1 h-1 bg-gold-light rounded-full mr-4 animate-pulse-subtle"></span>
                  {item}
                </p>
              ))}
            </div>

            <div
              className={`transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: "1.6s" }}
            >
              <button
                onClick={handleContactClick}
                className="inline-block text-gold-dark hover:text-gold-medium transition-all duration-300 text-sm font-light tracking-[0.15em] uppercase border-b border-gold-light pb-2 relative group cursor-pointer"
              >
                Agendar Consulta Gratuita
                <span className="absolute inset-0 border border-gold-light opacity-0 group-hover:opacity-100 transition-all duration-300 -m-3 rounded transform group-hover:scale-105"></span>
              </button>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative z-10 group">
              <Image
                src="/dra-jordanha.jpg?height=700&width=500&text=Professional+Lawyer+Portrait"
                alt="Dra. Jordanha Targino - Advogada Especialista em Direito Previdenciário"
                width={500}
                height={700}
                className="rounded-sm shadow-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="absolute top-8 -right-4 w-full h-full border border-gold-light -z-10 transition-all duration-500 hover:translate-x-2 hover:-translate-y-2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
