import { Layout, Menu } from 'antd';
import { useRouteMatch, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import Navigation from '../components/Navigation';
import SearchResult from '../components/SearchResult';
import SongDetail from '../components/SongDetail';
import Playlist from '../components/PlayList';
import Lyrics from '../components/Lyrics';

const { Header, Content, Footer, Sider } = Layout;

export default function HomeScreen() {

    let { path, url } = useRouteMatch();
    console.log(path);
    return (
        <Layout style={{height:"100vh"}}>
            <Router>
            <Navigation/>
            <Switch>
                <Route exact path="/search" component={SearchResult}></Route>
                <Route exact path="/song-detail" component={SongDetail}></Route>
                <Route exact path="/playlist" component={Playlist}></Route>
                <Route exact path="/lyrics" component={Lyrics}></Route>
            </Switch>
            </Router>
        </Layout>

    );
}

    