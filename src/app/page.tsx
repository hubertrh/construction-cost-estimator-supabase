import ButtonPrimary from "@/components/atoms/ButtonPrimary";
import addIcon from "/public/icons/add.svg";

export default async function Home() {
  return (
    <>
      <div className="grid place-items-center px-14 py-16">
        <h1 className="text-4xl font-light">WELCOME&nbsp;TO ESTIMATIC</h1>
        <h2 className="text-lg">
          —&ensp;a tool engineered for accurate construction cost estimations
        </h2>
        <div className="flex flex-row gap-10 pt-10">
          <ButtonPrimary
            variant="blue"
            icon={addIcon}
            size={12}
            alt="Add icon"
            position="left"
          >
            Create New Estimate
          </ButtonPrimary>
          <ButtonPrimary variant="white" href="/projects">
            My Projects
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
}
