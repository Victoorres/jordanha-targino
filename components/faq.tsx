"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false)
  const [openItems, setOpenItems] = useState<number[]>([])
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

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

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

  const faqs = [
    {
      question: "O que é o BPC/LOAS e quem tem direito?",
      answer:
        "O Benefício de Prestação Continuada (BPC/LOAS) é um benefício assistencial no valor de um salário mínimo mensal, destinado a pessoas com deficiência e idosos com 65 anos ou mais que comprovem não possuir meios de prover a própria manutenção nem tê-la provida por sua família. A renda familiar per capita deve ser inferior a 1/4 do salário mínimo.",
    },
    {
      question: "Quanto tempo demora para sair a aposentadoria?",
      answer:
        "O prazo para análise do pedido de aposentadoria pelo INSS é de até 45 dias. Porém, na prática, pode demorar mais devido ao volume de processos. Se houver negativa ou demora excessiva, é possível entrar com ação judicial para acelerar o processo e garantir seus direitos.",
    },
    {
      question: "Posso trabalhar recebendo BPC/LOAS?",
      answer:
        "Não é possível trabalhar com carteira assinada recebendo BPC/LOAS, pois o benefício é destinado a quem não possui meios de subsistência. Porém, trabalhos eventuais ou como MEI podem ser permitidos em algumas situações específicas, sempre analisando caso a caso.",
    },
    {
      question: "O que fazer se meu benefício foi negado?",
      answer:
        "Se seu benefício foi negado, você pode fazer um recurso administrativo no próprio INSS ou entrar com ação judicial. É importante analisar os motivos da negativa e reunir a documentação adequada. Nossa equipe pode ajudar a reverter essa situação e conquistar seu direito.",
    },
    {
      question: "É possível revisar benefícios já concedidos?",
      answer:
        "Sim! Muitos benefícios são concedidos com valores menores do que o devido. É possível fazer revisão para aumentar o valor e ainda receber as diferenças retroativas. Analisamos seu caso para verificar se há possibilidade de revisão.",
    },
    {
      question: "Quanto custa a consulta e os honorários?",
      answer:
        "Nossos honorários só são cobrados em caso de êxito, ou seja, você só paga se conseguirmos seu benefício. Trabalhamos com transparência total e sem custos antecipados para o cliente.",
    },
    {
      question: "Atendem em todo o Brasil?",
      answer:
        "Sim! Atendemos clientes em todo o território nacional. Realizamos consultas online e presenciais quando necessário. Temos experiência com processos em todos os estados brasileiros e conhecemos as particularidades de cada região.",
    },
    {
      question: "Quais documentos preciso para dar entrada no benefício?",
      answer:
        "Os documentos variam conforme o tipo de benefício, mas geralmente incluem: RG, CPF, comprovante de residência, carteira de trabalho, laudos médicos (quando aplicável), comprovantes de renda familiar, entre outros. Orientamos sobre toda a documentação necessária em cada caso específico.",
    },
  ]

  return (
    <section ref={sectionRef} id="faq" className="py-24 bg-champagne-light overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="text-sm text-gold-dark font-light tracking-[0.2em] uppercase mb-4 animate-fade-in">
            Dúvidas Frequentes
          </p>
          <h2
            className="text-4xl md:text-5xl font-serif font-light text-black-deep mb-6 tracking-tight animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Perguntas e Respostas
          </h2>
          <div
            className={`w-16 h-px bg-gold-light mx-auto mb-8 transition-all duration-1000 ease-out ${
              isVisible ? "animate-draw-line" : "w-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          ></div>
          <p
            className="text-lg text-gray-elegant max-w-2xl mx-auto font-light animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            Esclarecemos as principais dúvidas sobre
            <span className="font-normal text-black-deep"> benefícios previdenciários e nossos serviços</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white mb-4 shadow-sm hover:shadow-md transition-all duration-500 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300 group"
              >
                <h3 className="text-lg font-serif font-light text-black-deep pr-4 group-hover:text-gold-dark transition-colors duration-300">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gold-dark transition-transform duration-300 flex-shrink-0 ${
                    openItems.includes(index) ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openItems.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="w-full h-px bg-gold-light/30 mb-4"></div>
                  <p className="text-gray-elegant leading-relaxed font-light">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "1.6s" }}
        >
          <p className="text-gray-elegant font-light mb-6">Não encontrou sua dúvida? Entre em contato conosco!</p>
          <button
            onClick={handleContactClick}
            className="inline-block text-gold-dark hover:text-gold-medium transition-all duration-300 text-sm font-light tracking-[0.15em] uppercase border-b border-gold-light pb-2 relative group cursor-pointer"
          >
            Fazer Pergunta
            <span className="absolute inset-0 border border-gold-light opacity-0 group-hover:opacity-100 transition-all duration-300 -m-3 rounded transform group-hover:scale-105"></span>
          </button>
        </div>
      </div>
    </section>
  )
}
