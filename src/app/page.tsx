import {
  Header,
  Hero,
  Services,
  Highlights,
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
        <Services />
        <Highlights />
        <Specialist />
        <Technology />
        <Testimonials />
        <Appointment />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
