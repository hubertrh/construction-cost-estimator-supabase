import Link from "next/link";

export default function SidebarHeader() {
  return (
    <Link href={"/"}>
      <h1 className="p-0 pb-3 text-4xl font-light uppercase">ESTIMATIC</h1>
      <p className="p-0 text-sm font-light uppercase">
        Construction cost estimator
        <br />
        Kamil Woźniacki
      </p>
    </Link>
  );
}
