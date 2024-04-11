import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-screen flex-col items-end justify-between bg-background-dark px-6 py-4 text-sm font-light text-white">
      <div className="flex flex-col space-y-1 text-right">
        <Link href="/">Contact</Link>
        <Link href="/">Cookie Policy</Link>
        <Link href="/">Privacy Policy</Link>
      </div>
      <div className="mt-10 text-right text-xs text-gray-light">
        <p>&copy;&nbsp;2023 Kamil Woźniacki. All&nbsp;rights&nbsp;Reserved.</p>
        <p>
          <span className="text-gray">Created by </span>Hubert Rogala-Haracz
        </p>
      </div>
    </footer>
  );
}
