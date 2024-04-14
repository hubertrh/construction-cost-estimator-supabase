import Link from "next/link";

export default function SidebarHeader() {
  return (
    <div className="transition-all duration-300 hover:translate-x-1">
      <Link href={"/"}>
        <h1 className="ml-[-3px] p-0 pb-3 text-4xl uppercase">
          <span className="text-[2.6rem]">C</span>ost
          <span className="text-[2.6rem]">C</span>raft
        </h1>
        <p className="p-0 uppercase">
          Construction cost estimator
          <br />
          by <span className="text-lg leading-none">C</span>onstructive{" "}
          <span className="text-lg leading-none">C</span>reativity
        </p>
      </Link>
    </div>
  );
}
