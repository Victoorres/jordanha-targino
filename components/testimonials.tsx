"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: "Maria Silva",
      location: "São Paulo",
      text: "Dra. Jordanha me ajudou a conseguir meu BPC/LOAS após várias tentativas negadas. Profissional excepcional, sempre disponível e muito competente.",
      benefit: "BPC/LOAS",
      image: "/placeholder.svg?height=80&width=80&text=MS",
    },
    {
      name: "João Santos",
      location: "Rio de Janeiro",
      text: "Consegui minha aposentadoria por invalidez com a ajuda da Dra. Jordanha. Processo rápido e eficiente. Profissional que realmente entende do assunto.",
      benefit: "Aposentadoria por Invalidez",
      image: "/placeholder.svg?height=80&width=80&text=JS",
    },
    {
      name: "Ana Costa",
      location: "Belo Horizonte",
      text: "Excelente profissional! Me orientou durante todo o processo e conseguiu a revisão do meu benefício. Muito grata pelo trabalho dedicado e humanizado.",
      benefit: "Revisão de Benefício",
      image: "/placeholder.svg?height=80&width=80&text=AC",
    },
  ]

  return (
    <section ref={sectionRef} id="depoimentos" className="py-24 bg-champagne-light overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="text-sm text-gold-dark font-light tracking-[0.2em] uppercase mb-4 animate-fade-in">
            Depoimentos
          </p>
          <h2
            className="text-4xl md:text-5xl font-serif font-light text-black-deep mb-6 tracking-tight animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            O que dizem nossos clientes
          </h2>
          <div
            className={`w-16 h-px bg-gold-light mx-auto transition-all duration-1000 ease-out ${
              isVisible ? "animate-draw-line" : "w-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white p-8 shadow-sm hover:shadow-md transition-all duration-500 ease-out hover:-translate-y-1 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ animationDelay: `${0.6 + index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <div className="relative mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={`Foto de ${testimonial.name}`}
                    width={60}
                    height={60}
                    className="rounded-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full border border-gold-light opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <p className="font-serif font-normal text-black-deep transition-colors duration-300 group-hover:text-gold-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-elegant font-light">{testimonial.location}</p>
                </div>
              </div>

              <p className="text-gray-elegant leading-relaxed italic mb-6 font-light transition-colors duration-300 group-hover:text-black-deep">
                "{testimonial.text}"
              </p>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gold-dark font-light tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-gold-medium">
                  {testimonial.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
