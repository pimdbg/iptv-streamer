import './App.css'
import { Router } from '@/routing/Router'
import { ChannelsProvider } from './context/ChannelsContext'

function App() {
  return (
    <ChannelsProvider>
      <Router />
    </ChannelsProvider>
  )
}

export default App
