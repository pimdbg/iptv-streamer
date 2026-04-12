import { PageCard, Icon } from "@/components";
import { goTo } from "@/routing/utils"; 
import TvRetroIcon from "@/assets/icons/tv-retro.svg";
import { useGetCurrentDate } from "@/hooks";
import { formatDate, formatTime } from "@/utils";
import { WelcomePageLayout } from "@/layouts";

const WelcomePage = () => {
  const currentDate = useGetCurrentDate();

  return (
    <WelcomePageLayout>
      <div className="w-full h-full relative top-0 p-20 z-10">
        <div className="flex flex-col h-full">
          <h1 className="text-white font-light">Welcome</h1>
          <div className="flex-1 flex">
            <div className="w-full h-92 self-center flex gap-6">
              <PageCard 
                title="Live TV"
                subTitle="Subtitle" 
                icon={
                  <Icon 
                    icon={TvRetroIcon} 
                    size={48} 
                  />
                }
                className="h-full"
                onClick={() => goTo("#/channels-list")}
              />
              <PageCard 
                title="Movies"
                subTitle="Subtitle" 
                className="h-full"
                onClick={() => alert('Not Active')}
              />
              <PageCard 
                title="Radio"
                subTitle="Subtitle" 
                onClick={() => alert('Not Active')}
              />
              <div className="mt-auto ml-auto text-right">
                <p className="text-6xl mt-1">{formatTime(currentDate)}</p>
                
                <p className="text-3xl text-white/70 tracking-tight mt-1">{formatDate(currentDate, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WelcomePageLayout>
  )
}

export default WelcomePage;