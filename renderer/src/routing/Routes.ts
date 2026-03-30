import WelcomePage from "../pages/WelcomePage";
import ChannelListPage from "../pages/ChannelsListPage";
import LiveTvStreamer from "../pages/LiveTvStreamer";

const Routes: Record<string, React.FC> = {
    "/": WelcomePage,
    "/channels-list": ChannelListPage,
    "/live-tv": LiveTvStreamer
}

export default Routes;