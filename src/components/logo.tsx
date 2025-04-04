import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size: number;
}

export const Logo = ({ size }: LogoProps) => {
  return (
    <Link href="/" className="gap-2 w-full flex items-center rounded-sm hover:bg-[#00000008] h-14 px-2">
      <Image src="/logo.svg" alt="Logo" width={size} height={size} />
      <p className="text-xl text-primary">Opal</p>
    </Link>
  );
}