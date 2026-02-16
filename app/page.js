import Hero from '@/components/homepage/homehero.js'
import About from '@/components/homepage/aboutus'
import OurProducts from '@/components/homepage/ourproducts'
import ContactUs from '@/components/homepage/contactus'
import Nav from '@/components/common/nav/nav'
import Footer from '@/components/common/footer'

export default function Home() {
  return (
    <main>
      <div className='order-2 z-0 relative'>
        <Hero/>
        <About/>
        <OurProducts/>
        <ContactUs/>
        <Footer/>
      </div>
      <div className='order-1 z-50'>
        <Nav/>
      </div>
    </main>
  );
}
