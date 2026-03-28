import WelcomePage from "../pages/WelcomePage";
import ChannelListPage from "../pages/ChannelsListPage";

const Routes: Record<string, React.FC> = {
    "/": WelcomePage,
    "/channels-list": ChannelListPage,
}

export default Routes;