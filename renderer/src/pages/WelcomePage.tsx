import { PageCard } from "@/components/PageCard";
import { goTo } from "@/routing/utils";

const WelcomePage = () => {
  return (
    <div className="bg-linear-to-tr from-[rgb(42,39,55)] to-[rgb(76,71,106)] w-screen h-screen p-10">
      <div className="flex flex-col h-full">
        <h1 className="text-4xl text-white font-light">Welcome</h1>
        <div className="flex-1 flex">
          <div className="w-full h-92 self-center flex gap-6">
            <PageCard 
              title="Live TV"
              subTitle="Subtitle" 
              className="backdrop-blur-xl"
              onClick={() => {
                goTo("#/channels-list");
              }}
            />
            <PageCard 
              title="Movies"
              subTitle="Subtitle" 
              onClick={() => alert('Not Active')}
            />
            <PageCard 
              title="Radio"
              subTitle="Subtitle" 
              onClick={() => alert('Not Active')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage;