"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const EPUB_URL =
  "https://assets.zyrosite.com/bIWAzaiH02VksK8O/tokorel-prequels-WCYNOmZUuEPAsb6X.epub";
const PDF_URL = "/downloads/tokorel-prequel.pdf";

const BOOKS = [
  {
    title: "Khizara",
    cover: "/images/book-covers/khizara.jpeg",
    description:
      "The catalyst. Where the journey begins for the chosen bridge between worlds.",
    label: "Book One",
    href: "https://www.amazon.com/kindle-dbs/hz/subscribe/ku?ref=dbs_p_ebk_r00_pbcb_diupu0&passThroughAsin=B0C8S4TJWW",
  },
  {
    title: "Tokorel",
    cover: "/images/book-covers/tokorel-book-2.jpg",
    description:
      "The central system faces its ultimate trial as the prophecy unfolds across the stars.",
    label: "Book Two",
    href: null as string | null,
  },
  {
    title: "Cornerstone",
    cover: "/images/book-covers/cornerstone.jpg",
    description:
      "The final stand. Everything must be rebuilt from the fragments of the old world.",
    label: "Book Three",
    href: null as string | null,
  },
];

export default function PortalPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <PortalContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

function PortalContent() {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="relative z-30 w-full pt-6 pb-8 md:pb-12">
          <div className="flex flex-col items-center gap-4 md:gap-0">
            <div className="hidden md:grid grid-cols-3 items-center w-full max-w-5xl mx-auto px-6">
              <nav className="flex items-center gap-8 justify-start">
                <Link
                  href="/"
                  className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/portal"
                  className="text-sm font-medium uppercase tracking-widest text-primary"
                >
                  Books
                </Link>
              </nav>

              <Link href="/" className="flex justify-center drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
                <Image
                  src="/logo/tokorel-logo-transparent.png"
                  alt="Tokorel Series"
                  width={500}
                  height={200}
                  className="object-contain h-40 w-auto"
                  priority
                />
              </Link>

              <nav className="flex items-center gap-8 justify-end">
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </nav>
            </div>

            <div className="flex flex-col items-center md:hidden">
              <Link href="/" className="drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
                <Image
                  src="/logo/tokorel-logo-transparent.png"
                  alt="Tokorel Series"
                  width={400}
                  height={160}
                  className="object-contain h-28 w-auto"
                  priority
                />
              </Link>
              <nav className="flex items-center gap-6 mt-2">
                <Link href="/" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/portal" className="text-xs font-medium uppercase tracking-widest text-primary">
                  Books
                </Link>
                {user?.role === "admin" && (
                  <Link href="/admin" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 space-y-24">
          <section className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-100">
              Welcome to the{" "}
              <span className="text-primary">Tokorel Universe</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Your transmission has been received. Dive into the origins of the
              most acclaimed sci-fi epic of the decade.
            </p>
          </section>

          <CountdownTimer />

          <section className="grid md:grid-cols-2 gap-12 items-center bg-primary/5 rounded-xl p-8 md:p-12 border border-primary/10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-primary/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <Image
                src="/images/book-covers/the-sentence-tokorel-prequel.png"
                alt="Book cover of The Sentence — A Tokorel Prequel"
                width={500}
                height={750}
                className="relative rounded-lg shadow-2xl w-full aspect-[2/3] object-cover border border-primary/20"
                priority
              />
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-primary font-bold tracking-widest text-xs uppercase">
                  Exclusive Prequel Novella
                </span>
                <h3 className="text-3xl md:text-5xl font-bold text-slate-100">
                  The Sentence
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  In the shadow of the twin moons, a forbidden alliance
                  threatens the core of the Tokorel System. Discover the prequel
                  story that sets the stage for the epic saga.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={EPUB_URL}
                  download
                  className="flex-1 bg-primary text-bg-dark h-14 rounded-lg font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <DownloadIcon />
                  Download EPUB
                </a>
                <a
                  href={PDF_URL}
                  download
                  className="flex-1 border border-primary/30 text-primary h-14 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
                >
                  <PdfIcon />
                  Download PDF
                </a>
              </div>
            </div>
          </section>

          <section className="relative py-20 px-8 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
            <div className="absolute inset-0 parchment-texture" />
            <div className="relative z-10 text-center space-y-8">
              <span className="text-primary text-5xl opacity-50">&#10022;</span>
              <blockquote className="text-2xl md:text-4xl font-light italic text-primary/90 max-w-3xl mx-auto leading-relaxed">
                &ldquo;From the blood of two enemies, a bridge shall be
                born.&rdquo;
              </blockquote>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
              <p className="text-xs uppercase tracking-[0.4em] text-primary/40 font-bold">
                The Fragment of Khizara
              </p>
            </div>
          </section>

          <section className="space-y-12">
            <div className="flex items-end justify-between border-b border-primary/10 pb-6">
              <h3 className="text-3xl font-bold text-slate-100">The Books</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BOOKS.map((book) => {
                const Card = (
                  <div
                    className={`bg-primary/5 border border-primary/10 p-6 rounded-xl hover:bg-primary/10 transition-all group ${book.href ? "cursor-pointer" : ""}`}
                  >
                    <div className="aspect-[2/3] mb-6 rounded shadow-lg overflow-hidden border border-primary/20">
                      <Image
                        src={book.cover}
                        alt={`Book cover: ${book.title}`}
                        width={400}
                        height={600}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <h4 className="text-xl font-bold text-slate-100 mb-2">
                      {book.title}
                    </h4>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                      {book.description}
                    </p>
                    <span className="text-xs text-primary font-bold tracking-widest uppercase">
                      {book.label}
                    </span>
                    {book.href && (
                      <span className="block mt-3 text-xs text-accent font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        Read on Kindle &rarr;
                      </span>
                    )}
                  </div>
                );

                return book.href ? (
                  <a key={book.title} href={book.href} target="_blank" rel="noopener noreferrer">
                    {Card}
                  </a>
                ) : (
                  <div key={book.title}>{Card}</div>
                );
              })}
            </div>
          </section>

          <section className="text-center py-24 bg-gradient-to-t from-primary/10 to-transparent rounded-3xl border border-primary/5">
            <h3 className="text-3xl md:text-5xl font-bold text-slate-100 mb-8">
              Continue the Journey
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg">
              Don&apos;t stop at the prologue. The true fate of the Tokorel
              system awaits in the main series.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary text-bg-dark px-12 py-5 rounded-xl font-bold text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(13,242,242,0.3)]"
            >
              Back to Home
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
