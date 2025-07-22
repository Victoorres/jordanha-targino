"use client";

import emailjs from "@emailjs/browser";

// Configurações do EmailJS
const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_sqze2md";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_0ra80qe";
const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "xjS-JQGJQQUn8UwGg";

// Rate limiting usando localStorage
const RATE_LIMIT_KEY = "emailjs_last_sent";
const RATE_LIMIT_DURATION = 30 * 60 * 1000; // 30 minutos

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  benefitType?: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  remainingTime?: number;
}

export async function sendContactEmail(
  data: EmailData
): Promise<EmailResponse> {
  try {
    // Verificar rate limiting
    const lastSent = localStorage.getItem(RATE_LIMIT_KEY);

    if (lastSent) {
      const lastSentTime = Number.parseInt(lastSent);
      const now = Date.now();

      if (now - lastSentTime < RATE_LIMIT_DURATION) {
        const remainingTime = Math.ceil(
          (RATE_LIMIT_DURATION - (now - lastSentTime)) / (60 * 1000)
        );
        return {
          success: false,
          message: `Você deve aguardar ${remainingTime} minutos antes de enviar uma nova mensagem.`,
          remainingTime,
        };
      }
    }

    // Validar campos obrigatórios
    if (!data.name || !data.email || !data.phone || !data.message) {
      return {
        success: false,
        message: "Por favor, preencha todos os campos obrigatórios.",
      };
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Por favor, insira um email válido.",
      };
    }

    // Preparar dados para o template do EmailJS
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      benefit_type: data.benefitType || "Não especificado",
      message: data.message,
      to_name: "Dra. Jordanha Targino",
      reply_to: data.email,
      // Dados adicionais para o template
      current_date: new Date().toLocaleString("pt-BR"),
      subject: `Nova Consulta - ${
        data.benefitType || "Benefício Previdenciário"
      }`,
    };

    // Enviar email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      // Definir rate limiting
      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());

      return {
        success: true,
        message:
          "Mensagem enviada com sucesso! Você receberá uma resposta em até 24 horas.",
      };
    } else {
      throw new Error("Falha no envio");
    }
  } catch (error) {
    console.error("EmailJS error:", error);

    // Mensagens de erro específicas
    if (error instanceof Error) {
      if (error.message.includes("network")) {
        return {
          success: false,
          message: "Erro de conexão. Verifique sua internet e tente novamente.",
        };
      }

      if (error.message.includes("rate")) {
        return {
          success: false,
          message:
            "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
        };
      }
    }

    return {
      success: false,
      message:
        "Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.",
    };
  }
}

// Função para verificar se pode enviar (útil para UI)
export function canSendEmail(): { canSend: boolean; remainingTime?: number } {
  const lastSent = localStorage.getItem(RATE_LIMIT_KEY);

  if (!lastSent) {
    return { canSend: true };
  }

  const lastSentTime = Number.parseInt(lastSent);
  const now = Date.now();

  if (now - lastSentTime < RATE_LIMIT_DURATION) {
    const remainingTime = Math.ceil(
      (RATE_LIMIT_DURATION - (now - lastSentTime)) / (60 * 1000)
    );
    return { canSend: false, remainingTime };
  }

  return { canSend: true };
}

// Função para limpar rate limiting (útil para desenvolvimento)
export function clearRateLimit() {
  localStorage.removeItem(RATE_LIMIT_KEY);
}
