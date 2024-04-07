import Button from "@/components/atoms/Button";
import Image from "next/image";

export default function Home() {
  const addIcon = <Image src="/icons/add.svg" width={16} height={16} alt="Add icon" />;

  return (
    <>
      <div className="grid place-items-center py-24 px-14">
        <h1 className="text-4xl font-light">WELCOME TO ESTIMATIC</h1>
        <h2 className="text-l">
          This tool is engineered for accurate construction cost estimations.
        </h2>
        <div className="pt-10 flex flex-row gap-10">
          <Button text="Create New Estimate" icon={addIcon} position="left" />
          <Button text="Browse Recent" variant="secondary" />
        </div>
      </div>
    </>
  );
}
