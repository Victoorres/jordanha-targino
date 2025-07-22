'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleContactClick = () => {
    const targetElement = document.querySelector('#contato');
    if (targetElement) {
      const headerHeight = 100;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  const services = [
    {
      title: 'BPC/LOAS',
      description:
        'Benefício de Prestação Continuada para idosos e pessoas com deficiência que comprovem não possuir meios de prover a própria manutenção.',
      image: '/bpc.jpg?height=300&width=400&text=BPC+LOAS+Benefits',
    },
    {
      title: 'Aposentadoria',
      description:
        'Aposentadoria por idade, tempo de contribuição, invalidez e especial. Análise completa do seu caso previdenciário.',
      image: '/aposentadoria.jpg?height=300&width=400&text=Retirement+Planning',
    },
    {
      title: 'Revisão de Benefícios',
      description: 'Revisão e ampliação dos benefícios já concedidos pelo INSS, com possibilidade de recuperação de valores retroativos pagos a menor.',
      image: '/revisao-beneficios.jpg?height=300&width=400&text=Benefits+Review',
    },
    {
      title: 'Outros Benefícios',
      description: 'Atuação especializada em auxílio-doença, pensão por morte, salário-maternidade e demais benefícios previdenciários oferecidos pelo INSS.',
      image: '/outros-beneficios.png?height=300&width=400&text=INSS+Benefits',
    },
  ];

  return (
    <section ref={sectionRef} id="servicos" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <p className="text-sm text-gold-dark font-light tracking-[0.2em] uppercase mb-4 animate-fade-in">
            Áreas de Atuação
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-black-deep mb-6 tracking-tight animate-fade-in">
            Especialidades
          </h2>
          <div
            className={`w-16 h-0.5 bg-gold-light mx-auto mb-8 transition-all duration-1000 ease-out ${
              isVisible ? 'animate-draw-line' : 'w-0'
            }`}
            style={{ animationDelay: '0.4s' }}
          ></div>
          <p
            className="text-lg text-gray-elegant max-w-2xl mx-auto font-light animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            Oferecemos serviços especializados em Direito Previdenciário com foco na
            <span className="font-normal text-black-deep"> conquista dos seus direitos junto ao INSS</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ease-out hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ animationDelay: `${0.8 + index * 0.2}s` }}
            >
              <div className="relative mb-6 overflow-hidden">
                <Image
                  src={service.image || '/placeholder.svg'}
                  alt={`Serviços de ${service.title} - Direito Previdenciário`}
                  width={500}
                  height={300}
                  className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black-deep/20 group-hover:bg-gold-dark/10 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-light text-black-deep tracking-tight transition-colors duration-300 group-hover:text-gold-dark">
                  {service.title}
                </h3>
                <p className="text-gray-elegant leading-relaxed font-light transition-all duration-300 group-hover:text-black-deep">
                  {service.description}
                </p>
                <button
                  onClick={handleContactClick}
                  className="inline-block text-gold-dark hover:text-gold-medium transition-all duration-300 text-sm font-light tracking-[0.15em] uppercase pb-1 relative group/link cursor-pointer"
                >
                  Consultar Especialista
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-medium transition-all duration-300 group-hover/link:w-full"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
