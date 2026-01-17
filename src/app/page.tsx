import {
  Header,
  Hero,
  Stats,
  Services,
  Technology,
  Specialist,
  Appointment,
  Testimonials,
  CTA,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Technology />
        <Specialist />
        <Testimonials />
        <Appointment />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
