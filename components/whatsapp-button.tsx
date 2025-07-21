'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Aparece após 2 segundos

    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = '558491110007'; // Formato internacional
  const message = 'Olá! Vim pelo seu site e gostaria de agendar uma consulta';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Card */}
      <div
        className={`absolute bottom-16 right-0 bg-white shadow-xl rounded-lg p-4 w-80 transition-all duration-300 ease-out ${
          isExpanded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <i className="fab fa-whatsapp text-white text-xl"></i>
            </div>
            <div>
              <h4 className="font-serif font-light text-black-deep">Dra. Jordanha Targino</h4>
              <p className="text-xs text-green-600 font-light">Online agora</p>
            </div>
          </div>
          <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-gray-elegant font-light mb-4 leading-relaxed">
          Olá! 👋 Precisa de ajuda com benefícios do INSS? Estou aqui para esclarecer suas dúvidas.
        </p>

        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-all duration-300 text-sm font-light tracking-wide flex items-center justify-center space-x-2"
        >
          <i className="fab fa-whatsapp text-lg"></i>
          <span>Iniciar Conversa</span>
        </button>

        <p className="text-xs text-gray-light text-center mt-2 font-light">Resposta em poucos minutos</p>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-pulse-subtle"
      >
        <i className="fab fa-whatsapp text-2xl transition-transform duration-300 group-hover:scale-110"></i>
      </button>

      {/* Notification Dot */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-xs text-white font-bold">1</span>
      </div>
    </div>
  );
}
