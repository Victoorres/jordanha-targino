import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import SmoothScroll from "@/components/smooth-scroll"

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-black-deep">
      <SmoothScroll />
      <Header />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      {/* <FAQ /> */}
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
