import Hero from '@/components/homepage/homehero.js'
import About from '@/components/homepage/aboutus'
import OurProducts from '@/components/homepage/ourproducts'
import ContactUs from '@/components/homepage/contactus'

export default function Home() {
  return (
    <main>
      <Hero/>
      <About/>
      <OurProducts/>
      <ContactUs/>
    </main>
  );
}
