"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail, canSendEmail, type EmailData } from "@/lib/emailjs";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
    remainingTime?: number;
  }>({ type: null, message: "" });
  const [canSend, setCanSend] = useState(true);
  const [remainingTime, setRemainingTime] = useState<number | undefined>();
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

  // Verificar rate limiting ao carregar o componente
  useEffect(() => {
    const checkRateLimit = () => {
      const { canSend: canSendNow, remainingTime: remaining } = canSendEmail();
      setCanSend(canSendNow);
      setRemainingTime(remaining);
    };

    checkRateLimit();

    // Verificar a cada minuto se ainda está no rate limit
    const interval = setInterval(checkRateLimit, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);

    const emailData: EmailData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      benefitType: formData.get("benefitType") as string,
      message: formData.get("message") as string,
    };

    try {
      const result = await sendContactEmail(emailData);

      setSubmitStatus({
        type: result.success ? "success" : "error",
        message: result.message,
        remainingTime: result.remainingTime,
      });

      if (result.message === "OK") {
        // Reset form
        e.currentTarget.reset();
        setCanSend(false);
        setRemainingTime(30); // 30 minutos
      } else if (result.remainingTime) {
        setCanSend(false);
        setRemainingTime(result.remainingTime);
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Erro inesperado. Tente novamente ou entre em contato pelo WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { label: "Telefone", value: "(84) 99111-0007" },
    { label: "E-mail", value: "jordanha3003@gmail.com" },
    { label: "Atendimento", value: "Todo o Brasil" },
    { label: "Horário", value: "08:00 às 18:00, Segunda a Sexta" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="mb-6">
              <p className="text-sm text-gold-dark font-light tracking-[0.2em] uppercase mb-4">
                Contato
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-light text-black-deep mb-8 tracking-tight">
              Entre em Contato
            </h2>

            <div
              className={`w-16 h-px bg-gold-light mb-8 transition-all duration-1000 ease-out ${
                isVisible ? "animate-draw-line" : "w-0"
              }`}
            ></div>

            <p className="text-lg text-gray-elegant mb-12 leading-relaxed font-light">
              Agende sua consulta e descubra como podemos ajudar você a
              <span className="font-normal text-black-deep">
                {" "}
                conquistar seus direitos previdenciários.
              </span>
            </p>

            <div className="space-y-8 mb-12">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 group transition-all duration-500 ease-out hover:translate-x-2 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="w-12 h-12 bg-gold-light/10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-gold-light/20">
                    <div className="w-1 h-1 bg-gold-dark rounded-full animate-pulse-subtle"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-elegant font-light tracking-wide uppercase mb-1 transition-colors duration-300 group-hover:text-gold-dark">
                      {item.label}
                    </p>
                    <p className="text-gold-dark font-light transition-colors duration-300 group-hover:text-gold-medium">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`bg-champagne-light p-8 lg:p-12 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <h3 className="text-2xl font-serif font-light text-black-deep mb-8 tracking-tight">
              Envie um e-mail
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-elegant font-light tracking-wide uppercase mb-2">
                    Nome *
                  </label>
                  <Input
                    name="name"
                    required
                    placeholder="Seu nome completo"
                    className="border-gray-200 focus:border-gold-light focus:ring-1 focus:ring-gold-light/30 rounded-none bg-white transition-all duration-300 hover:border-gold-light/50 text-gray-elegant placeholder:text-gray-light focus:text-gray-elegant font-light"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-elegant font-light tracking-wide uppercase mb-2">
                    Telefone *
                  </label>
                  <Input
                    name="phone"
                    required
                    placeholder="(11) 99999-9999"
                    className="border-gray-200 focus:border-gold-light focus:ring-1 focus:ring-gold-light/30 rounded-none bg-white transition-all duration-300 hover:border-gold-light/50 text-gray-elegant placeholder:text-gray-light focus:text-gray-elegant font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-elegant font-light tracking-wide uppercase mb-2">
                  E-mail *
                </label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="border-gray-200 focus:border-gold-light focus:ring-1 focus:ring-gold-light/30 rounded-none bg-white transition-all duration-300 hover:border-gold-light/50 text-gray-elegant placeholder:text-gray-light focus:text-gray-elegant font-light"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-elegant font-light tracking-wide uppercase mb-2">
                  Tipo de Benefício
                </label>
                <select
                  name="benefitType"
                  className="w-full p-3 border border-gray-200 focus:border-gold-light focus:ring-1 focus:ring-gold-light/30 text-gray-elegant rounded-none bg-white transition-all duration-300 hover:border-gold-light/50 focus:text-gray-elegant font-light"
                >
                  <option value="">Selecione o tipo de benefício</option>
                  <option value="BPC/LOAS">BPC/LOAS</option>
                  <option value="Aposentadoria por Idade">
                    Aposentadoria por Idade
                  </option>
                  <option value="Aposentadoria por Tempo">
                    Aposentadoria por Tempo
                  </option>
                  <option value="Aposentadoria por Invalidez">
                    Aposentadoria por Invalidez
                  </option>
                  <option value="Revisão de Benefício">
                    Revisão de Benefício
                  </option>
                  <option value="Auxílio-doença">Auxílio-doença</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-elegant font-light tracking-wide uppercase mb-2">
                  Mensagem *
                </label>
                <Textarea
                  name="message"
                  required
                  placeholder="Conte-nos sobre sua situação..."
                  rows={4}
                  className="border-gray-200 focus:border-gold-light focus:ring-1 focus:ring-gold-light/30 rounded-none bg-white transition-all duration-300 hover:border-gold-light/50 text-gray-elegant placeholder:text-gray-light focus:text-gray-elegant font-light"
                />
              </div>

              {submitStatus.type && (
                <div
                  className={`p-4 rounded-sm text-sm font-light ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                  {submitStatus.remainingTime && (
                    <div className="mt-2 text-xs">
                      Você poderá enviar uma nova mensagem em{" "}
                      {submitStatus.remainingTime} minutos.
                    </div>
                  )}
                </div>
              )}

              {!canSend && remainingTime && (
                <div className="p-4 rounded-sm text-sm font-light bg-yellow-50 text-yellow-700 border border-yellow-200">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-clock"></i>
                    <span>
                      Aguarde {remainingTime} minutos para enviar uma nova
                      mensagem.
                    </span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !canSend}
                className="w-full py-4 bg-gold-dark hover:bg-gold-medium disabled:bg-gray-300 disabled:cursor-not-allowed text-white transition-all duration-300 text-sm font-light tracking-[0.15em] uppercase relative group overflow-hidden"
              >
                <span className="relative z-10">
                  {isSubmitting
                    ? "Enviando..."
                    : !canSend
                    ? `Aguarde ${remainingTime}min`
                    : "Enviar Mensagem"}
                </span>
                <div className="absolute inset-0 bg-gold-medium transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>

              <p className="text-xs text-gray-elegant text-center font-light">
                Responderemos em até 24 horas.
                <br />
                <span className="text-gold-dark">
                  Para evitar spam, você pode enviar apenas uma mensagem a cada
                  30 minutos.
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
