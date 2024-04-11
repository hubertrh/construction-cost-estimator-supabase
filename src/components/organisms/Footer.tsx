import Link from "next/link";
import FooterLink from "../atoms/FooterLink";

export default function Footer() {
  return (
    <footer className="flex w-screen flex-col items-end justify-between bg-background-dark px-6 py-4 text-sm font-light text-white">
      <div className="flex flex-col space-y-1.5 text-right">
        <FooterLink href="/">Contact</FooterLink>
        <FooterLink href="/">Cookie Policy</FooterLink>
        <FooterLink href="/">Privacy Policy</FooterLink>
      </div>
      <div className="mt-10 text-right text-xs text-gray-light">
        <p>&copy;&nbsp;2023 Kamil Woźniacki. All&nbsp;rights&nbsp;Reserved.</p>
        <p>
          <span className="text-gray">Created by </span>
          <Link
            className="underline-offset-4 transition-all duration-300 hover:underline"
            href="https://www.linkedin.com/in/hubertrh/"
          >
            Hubert Rogala-Haracz
          </Link>
        </p>
      </div>
    </footer>
  );
}
