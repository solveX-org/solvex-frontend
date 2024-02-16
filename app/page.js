import Hero from '@/components/homepage/homehero.js'
import About from '@/components/homepage/aboutus'
import OurProducts from '@/components/homepage/ourproducts'
import ContactUs from '@/components/homepage/contactus'
import Nav from '@/components/common/nav/nav'
import Footer from '@/components/common/footer'

export default function Home() {
  return (
    <main>
      <Nav/>
      <Hero/>
      <About/>
      <OurProducts/>
      <ContactUs/>
      <Footer/>
    </main>
  );
}
