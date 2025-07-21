"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: "2000+", label: "Clientes Atendidos" },
    { value: "1500+", label: "Casos Resolvidos" },
    { value: "27", label: "Estados Atendidos" },
    { value: "95%", label: "Taxa de Sucesso" },
  ]

  return (
    <section ref={sectionRef} id="sobre" className="py-24 bg-champagne-light overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div
            className={`relative transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="group">
              <Image
                src="/estatua-da-justica.jpg?height=600&width=700&text=Modern+Law+Office+Interior"
                alt="Escritório de Advocacia Moderno e Profissional"
                width={700}
                height={600}
                className="rounded-sm shadow-xl object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div
              className={`absolute -bottom-8 -left-8 bg-white p-8 shadow-lg transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              <p className="text-4xl font-serif font-bold text-black-deep mb-2 animate-scale-in">10+</p>
              <p className="text-sm text-gray-elegant font-medium tracking-wide uppercase">Anos de Experiência</p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-sm text-gold-dark font-light tracking-[0.2em] uppercase mb-4">Sobre a Advogada</p>
            </div>

            <h2
              className="text-4xl md:text-5xl font-serif font-light text-black-deep mb-8 leading-tight tracking-tight"
              style={{ animationDelay: "0.4s" }}
            >
              Dra. Jordanha Targino
            </h2>

            <div
              className={`w-16 h-0.5 bg-gold-dark mb-8 transition-all duration-1000 ease-out ${
                isVisible ? "animate-draw-line" : "w-0"
              }`}
              style={{ animationDelay: "0.6s" }}
            ></div>

            <div className="space-y-6 text-gray-elegant leading-relaxed mb-12">
              {[
                "Advogada especializada em Direito Previdenciário com mais de 10 anos de experiência na conquista de benefícios do INSS.",
                "Formada em Direito e pós-graduada em Direito Previdenciário, dedica-se exclusivamente a ajudar pessoas a conquistarem seus direitos junto ao Instituto Nacional do Seguro Social.",
                "Com atendimento em todo o Brasil, já ajudou mais de 2.000 pessoas a obterem BPC/LOAS, aposentadorias e outros benefícios previdenciários, sempre com foco na excelência e humanização do atendimento.",
              ].map((text, index) => (
                <p
                  key={index}
                  className={`text-lg font-light transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ animationDelay: `${0.8 + index * 0.2}s` }}
                >
                  {index === 0 && (
                    <span className="font-normal text-black-deep">
                      Advogada especializada em Direito Previdenciário
                    </span>
                  )}
                  {index === 0 ? text.replace("Advogada especializada em Direito Previdenciário", "") : text}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-6 bg-white shadow-sm transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ animationDelay: `${1.4 + index * 0.1}s` }}
                >
                  <p className="text-3xl font-serif font-light text-black-deep mb-2 animate-scale-in">{stat.value}</p>
                  <p className="text-xs text-gray-elegant font-light tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
