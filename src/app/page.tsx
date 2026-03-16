import Image from "next/image";
import ParticleCanvas from "@/components/ParticleCanvas";
import SignupForm from "@/components/SignupForm";
import BeamCard from "@/components/BeamCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      {/* Grid Overlay */}
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        {/* ── Hero Section ──────────────────────────── */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 -z-10">
            <ParticleCanvas />
            <div className="nebula-layer" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-transparent to-bg-dark" />
          </div>

          <div className="max-w-4xl text-center space-y-8">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-100 glow-text leading-[0.9]">
              ENTER THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent">
                TOKOREL UNIVERSE
              </span>
            </h2>

            <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              Two civilizations divided for 200 years. <br />
              <span className="text-accent/80">
                One prophecy that could change everything.
              </span>
            </p>

            <SignupForm variant="hero" />

            <p className="text-slate-400 text-sm mt-4 font-medium">
              Readers who join the archives receive early lore, discoveries, and new Tokorel stories.
            </p>
            <p className="text-slate-500 text-sm font-medium italic">
              Receive immediate transmission of &lsquo;The Sentence&rsquo;
              prequel upon arrival.
            </p>
          </div>
        </main>

        {/* ── Forbidden Connection Section ──────────── */}
        <section className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Book Cover with Beam Effect */}
            <div className="relative group">
              <div className="absolute -inset-8 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition duration-1000 pointer-events-none" />
              <BeamCard>
                <Image
                  src="/images/book-covers/the-sentence-tokorel-prequel.png"
                  alt="Book cover of The Sentence — A Tokorel Prequel"
                  width={600}
                  height={900}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700 block"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent pointer-events-none" />
              </BeamCard>
            </div>

            {/* Story Copy */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-accent">
                <span className="h-px w-12 bg-accent" />
                <span className="uppercase tracking-widest text-sm font-bold">
                  Classified Files
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
                A Forbidden Connection
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed">
                The Tokorel Saga is a character-driven epic science-fiction
                universe featuring ancient prophecy, divided worlds, and a
                destiny that could unite the galaxy.
              </p>
            </div>
          </div>
        </section>

        {/* ── Final CTA Section ────────────────────── */}
        <section className="py-32 px-6 relative text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(13,242,242,0.1)_0%,transparent_70%)]" />

          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-100 glow-text">
              Are You Ready to <br /> Begin the Journey?
            </h2>

            <p className="text-slate-400 text-lg">
              History is written by the victors, but the future belongs to those
              who see the truth. Secure your transmission today.
            </p>

            <SignupForm variant="cta" />

            <div className="space-y-2">
              <p className="text-slate-400 text-sm font-medium">
                Readers who join the archives receive early lore, discoveries, and new Tokorel stories.
              </p>
              <p className="text-slate-500 text-sm font-medium italic">
                Receive immediate transmission of &lsquo;The Sentence&rsquo;
                prequel upon arrival.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Background Ambient Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </>
  );
}
