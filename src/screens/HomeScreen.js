import { Layout, Menu } from 'antd';
import { useEffect } from 'react';
import { useRouteMatch, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import Navigation from '../components/Navigation';
import SearchResult from '../components/SearchResult';
import SongDetail from '../components/SongDetail';
import Playlist from '../components/PlayList';
import Lyrics from '../components/Lyrics';
import { login, saveToken } from '../services/auth.service';
import SearchBar from '../components/SearchBar';
const { Header, Content, Footer, Sider } = Layout;


const client_data = {
    client_id: '464a90a18eb6466c81bd0c0351493050',
    clinet_secret: 'aca9ce3362964e148fd36852236530ac',
    uri: encodeURI('http://localhost:3000/'),
    scope: [
        "user-read-private",
        "user-modify-playback-state",
        "user-read-playback-position",
        "user-library-read"
    ]
};

const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${client_data.client_id}&response_type=code&redirect_uri=${client_data.uri}&show_dialog=true&scope=${client_data.scope.join(' ')}`;


export default function HomeScreen() {

    let { path, url } = useRouteMatch();
    useEffect(() => {
        if (window.location.search.length === 0){
            window.location.href = spotifyUrl;
        }
        else if (window.location.search.length > 0){
            handleRedirect();
        }
    }, []);
    
    const handleRedirect = async () =>{
        const urlParam = new URLSearchParams(window.location.search);
        let code = urlParam.get('code');
        let payload = "grant_type=authorization_code"+
            "&code=" + code +
            "&redirect_uri="+ client_data.uri
        const data = await login(payload, client_data);
        saveToken(data);
        console.log(data);
    }
    

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



    