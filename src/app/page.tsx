import Image from "next/image";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";

export default function Home() {
  const addIcon = (
    <Image src="/icons/add.svg" width={16} height={16} alt="Add icon" />
  );

  return (
    <>
      <div className="grid place-items-center px-14 py-24">
        <h1 className="text-4xl font-light">WELCOME TO ESTIMATIC</h1>
        <h2 className="text-lg">
          —&ensp;a tool engineered for accurate construction cost estimations
        </h2>
        <div className="flex flex-row gap-10 pt-10">
          <ButtonPrimary variant="blue" icon={addIcon} position="left">
            Create New Estimate
          </ButtonPrimary>
          <ButtonPrimary variant="white">Browse Recent</ButtonPrimary>
        </div>
      </div>
    </>
  );
}
