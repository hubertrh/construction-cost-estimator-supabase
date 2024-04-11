import Link from "next/link";

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="transition-all duration-300 hover:-translate-x-1"
    >
      {children}
    </Link>
  );
}
