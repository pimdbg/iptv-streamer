import { PageCard, Icon } from "@/components";
import { goTo } from "@/routing/utils"; 
import TvRetroIcon from "@/assets/icons/tv-retro.svg";
import { useGetCurrentDate } from "@/hooks";
import { formatDate, formatTime } from "@/utils";

const WelcomePage = () => {
  const currentDate = useGetCurrentDate();

  return (
    <WelcomeLayout>
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
    </WelcomeLayout>
  )
}

function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-screen h-screen bg-bg" style={{
        backgroundImage: `
          linear-gradient(to right, var(--color-bg), 5%, var(--color-bg), 80%, rgba(76,71,106,0.85)),
          url(https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
        `,
        backgroundSize: "cover, 80% cover",
        backgroundPosition: "center, right",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      {children}
    </div>
  )
}

export default WelcomePage;