import './App.css'
import TvIcon from './assets/tv-retro.svg'

function HomeScreenCard({
  title,
  subTitle,
}: any) {
  return (
    <button className="bg-[rgb(42,39,55)] p-8 h-full w-64 text-left hover:scale-105 transition-transform">
      <div className="flex flex-col h-full">
        <div className="mt-auto">
          <h3 className="text-2xl text-white mt-auto">{title}</h3>
          <p className="text-white/50 font-light text-sm mt-1">{subTitle}</p>
        </div>
      </div>
    </button>
  )
}

function App() {
  return (
    <div className="bg-[rgba(28,26,39,1)] w-screen h-screen p-10">
      <div className="flex flex-col h-full">
        <h1 className="text-4xl text-white font-light">Welcome</h1>
        <div className="flex-1 flex">
          <div className="w-full h-92 self-center flex gap-6">
            <HomeScreenCard 
              title="Channels"
              subTitle="Subtitle" 
            />
            <HomeScreenCard 
              title="Movies"
              subTitle="Subtitle" 
            />
            <HomeScreenCard 
              title="Radio"
              subTitle="Subtitle" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
