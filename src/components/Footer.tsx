import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto py-10 px-6 border-t border-primary/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 hover:opacity-100 transition duration-500">
        <Link href="/">
          <Image
            src="/logo/tokorel-logo-transparent.png"
            alt="Tokorel Series"
            width={280}
            height={100}
            className="object-contain h-20 w-auto"
          />
        </Link>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Tokorel Universe Publications. All
          rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-slate-400">
          <a
            href="mailto:drew@tokorel.com"
            className="hover:text-primary transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
