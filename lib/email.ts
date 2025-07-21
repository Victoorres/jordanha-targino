'use server';

import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail(formData: FormData) {
  try {
    // Check rate limiting
    const cookieStore = cookies();
    const lastSent = cookieStore.get('last_email_sent');

    if (lastSent) {
      const lastSentTime = Number.parseInt(lastSent.value);
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

      if (now - lastSentTime < thirtyMinutes) {
        const remainingTime = Math.ceil((thirtyMinutes - (now - lastSentTime)) / (60 * 1000));
        return {
          success: false,
          message: `Você deve aguardar ${remainingTime} minutos antes de enviar uma nova mensagem.`,
          remainingTime,
        };
      }
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const benefitType = formData.get('benefitType') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return {
        success: false,
        message: 'Por favor, preencha todos os campos obrigatórios.',
      };
    }

    // Email to lawyer
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'jordanha3003@gmail.com',
      subject: `Nova Consulta - ${benefitType || 'Não especificado'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #8B5E20; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Nova Consulta Jurídica</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #8B5E20; margin-bottom: 20px;">Dados do Cliente</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telefone:</strong> ${phone}</p>
              <p><strong>Tipo de Benefício:</strong> ${benefitType || 'Não especificado'}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #8B5E20; margin-top: 0;">Mensagem:</h3>
              <p style="line-height: 1.6;">${message}</p>
            </div>
          </div>
          
          <div style="background: #F8F6F0; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p>Esta mensagem foi enviada através do site jordanhatargino.adv.br</p>
            <p>Data: ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      `,
    };

    // Auto-reply to client
    const autoReplyOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Consulta Recebida - Dra. Jordanha Targino',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #8B5E20; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Dra. Jordanha Targino</h1>
            <p style="margin: 5px 0 0 0;">Direito Previdenciário</p>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #8B5E20;">Olá, ${name}!</h2>
            
            <p>Recebemos sua consulta sobre <strong>${
              benefitType || 'benefícios previdenciários'
            }</strong> e agradecemos pelo contato.</p>
            
            <p>Nossa equipe analisará seu caso e retornará em até <strong>24 horas</strong> com uma resposta personalizada.</p>
            
            <div style="background: #F8F6F0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #8B5E20; margin-top: 0;">Próximos Passos:</h3>
              <ul style="line-height: 1.8;">
                <li>Análise inicial do seu caso</li>
                <li>Contato telefônico para esclarecimentos</li>
                <li>Agendamento da consulta gratuita</li>
                <li>Orientação sobre documentação necessária</li>
              </ul>
            </div>
            
            <p>Caso tenha urgência, entre em contato pelo WhatsApp: <strong>(84) 99111-0007</strong></p>
            
            <p style="margin-top: 30px;">
              Atenciosamente,<br>
              <strong>Dra. Jordanha Targino</strong><br>
              <em>Especialista em Direito Previdenciário</em>
            </p>
          </div>
          
          <div style="background: #F8F6F0; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p>Este é um email automático. Para dúvidas, responda este email ou ligue para (84) 99111-0007</p>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    // Set rate limiting cookie
    const response = {
      success: true,
      message: 'Mensagem enviada com sucesso! Você receberá uma resposta em até 24 horas.',
    };

    // Set cookie for rate limiting (30 minutes)
    cookieStore.set('last_email_sent', Date.now().toString(), {
      maxAge: 30 * 60, // 30 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Email error:', error);
    return {
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente ou entre em contato pelo telefone.',
    };
  }
}
