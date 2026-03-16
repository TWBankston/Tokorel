import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-30 w-full flex justify-center pt-6 pb-0 -mb-16 md:-mb-24">
      <Link href="/" className="relative drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
        <Image
          src="/logo/tokorel-logo-transparent.png"
          alt="Tokorel Series"
          width={600}
          height={240}
          className="object-contain h-40 md:h-56 w-auto"
          priority
        />
      </Link>
    </header>
  );
}
