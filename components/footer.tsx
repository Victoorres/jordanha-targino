'use client';

import Image from 'next/image';

export default function Footer() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '558491110007';
    const message = 'Olá! Vim pelo seu site e gostaria de agendar uma consulta';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/jordanha_advocacia/", "_blank", "noopener,noreferrer")
  };

  const handleSmoothScroll = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerHeight = 100;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo.png"
                alt="Jordanha Targino Advogada - Logo"
                width={40}
                height={40}
                className="transition-transform duration-300 hover:scale-105"
              />
              <div>
                <h3 className="text-lg font-serif font-light text-gold-dark">Jordanha Targino</h3>
                <p className="text-xs text-gold-dark font-light tracking-[0.15em] uppercase">Advogada</p>
              </div>
            </div>
            <p className="text-sm text-gray-elegant font-light leading-relaxed">
              Especialista em Direito Previdenciário com atendimento humanizado em todo o Brasil.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-light text-black-deep mb-4 tracking-wide uppercase">Contato</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-elegant font-light">(84) 99111-0007</p>
              <p className="text-gray-elegant font-light">jordanha3003@gmail.com</p>
              <p className="text-gray-elegant font-light">Atendimento em todo o Brasil</p>
            </div>
          </div>

          {/* Quick Action */}
          <div>
            <h4 className="text-sm font-light text-black-deep mb-4 tracking-wide uppercase">Redes Sociais</h4>
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors font-light text-sm group cursor-pointer"
              >
                <i className="fab fa-whatsapp text-lg group-hover:scale-110 transition-transform"></i>
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleInstagramClick}
                className="flex items-center space-x-2 text-[#C13584] hover:text-text-[#E1306C] transition-colors font-light text-sm group cursor-pointer"
              >
                <i className="fab fa-instagram text-lg group-hover:scale-110 transition-transform"></i>
                <span>Instagram</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-gray-elegant font-light text-center">
              &copy; {new Date().getFullYear()} Jordanha Targino Advogada. <div>Todos os direitos reservados.</div>
            </p>
            <div className="flex space-x-6 text-xs">
              <button
                onClick={() => handleSmoothScroll('#sobre')}
                className="text-gray-elegant hover:text-gold-dark transition-colors font-light cursor-pointer"
              >
                Sobre
              </button>

              <button
                onClick={() => handleSmoothScroll('#servicos')}
                className="text-gray-elegant hover:text-gold-dark transition-colors font-light cursor-pointer"
              >
                Serviços
              </button>

              <button
                onClick={() => handleSmoothScroll('#contato')}
                className="text-gray-elegant hover:text-gold-dark transition-colors font-light cursor-pointer"
              >
                Contato
              </button>
              {/* <button
                onClick={() => handleSmoothScroll('#faq')}
                className="text-gray-elegant hover:text-gold-dark transition-colors font-light cursor-pointer"
              >
                FAQ
              </button> */}
              {/* <a href="#servicos" className="text-gray-elegant hover:text-gold-dark transition-colors font-light">
                Serviços
              </a>
              <a href="#" className="text-gray-elegant hover:text-gold-dark transition-colors font-light">
                Termos
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
