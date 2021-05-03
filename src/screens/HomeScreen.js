import { Layout, Menu } from 'antd';
import { useRouteMatch, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";
import 'antd/dist/antd.css';
import Navigation from '../components/Navigation';
import SearchResult from '../components/SearchResult';

const { Header, Content, Footer, Sider } = Layout;

export default function HomeScreen() {

    let { path, url } = useRouteMatch();
    console.log(path);
    return (
        <Layout style={{height:"100vh"}}>
            <Navigation/>
            <Router>
            <Switch>
                <Route exact path="/search" component={SearchResult}></Route>
                <Route exact path={path + "/songinformation"}></Route>
                <Route exact path={path + "/playlist"}></Route>
                <Route exact path={path + "/lyrics"}></Route>
            </Switch>
            </Router>
        </Layout>
    );
}

    