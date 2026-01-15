import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/carrefour.png"
        alt="Carrefour"
        width={160}
        height={40}
        priority
        className="h-10 w-auto object-contain"
      />
    </Link>
  );
}
