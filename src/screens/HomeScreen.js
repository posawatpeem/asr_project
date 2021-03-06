import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useRouteMatch, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import Navigation from '../components/Navigation';
import SearchResult from '../components/SearchResult';
import Playlist from '../components/PlayList';
import Lyrics from '../components/Lyrics';
import { login } from '../services/auth.service';
import {makeStyles, createStyles} from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-node';
import Home from '../components/Home'
const { Header, Content, Footer, Sider } = Layout;

const client_data = {
    client_id: 'b6d7bafeb31a49f4b7cae4176f4d3cef',
    clinet_secret: 'c6fd4dc5d4ac4d89801fb9a586524102',
    uri: encodeURI('http://localhost:3000/'),
    scope: "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
};
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${client_data.client_id}&response_type=code&redirect_uri=${client_data.uri}&show_dialog=true&scope=${client_data.scope}`;

const spotifyApi = new SpotifyWebApi({
    clientId: 'b6d7bafeb31a49f4b7cae4176f4d3cef',
    accessToken: localStorage.getItem("access_token")
})

export default function HomeScreen() {

    let { path, url } = useRouteMatch();
    const songs = [];
    const [text, setText] = useState("");
    const [song, setSong] = useState([]);
    const [category, setCategory] = useState("rock");
    const [songLyric, setSongLyric] = useState(false);

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
        if (data.access_token !== undefined) localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token !== undefined) localStorage.setItem("refresh_token", data.refresh_token);
        console.log(data);
    }
    
    function homeToNav(t) {
        console.log(t);
        setText(t);
    }

    function sendSong(obj){
        console.log(obj)
        setSong(obj)
    }
    
    useEffect(() => {
        //console.log(text.toString)
        let cat = {"????????????":"rock","????????????":"pop","?????????":"thai","??????????????????":"hip-hop","??????????????????":"kpop","??????????????????":"indie"}
        let command = text.toString().trim().split(" ")
        let commandWord = ['????????????',"??????","????????????","????????????",'????????????',"?????????","??????","??????","??????????????????"]
        // for (var i = 0; i < command.length; i++) {
        //     console.log(commandWord.includes(command[i]));
        //     command = command.slice(i-1,command.length)
        // }
        console.log(command)
        if (command.includes('??????') && command.includes('????????????')) {
            //console.log
            if (command.includes('????????????')) {
                console.log('rock')
                setCategory(cat["????????????"])
            } else if (command.includes('????????????')) {
                console.log('pop')
                setCategory(cat["????????????"])
            } else if (command.includes('??????????????????')) {
                console.log('pop')
                setCategory(cat["??????????????????"])
            }else  {
                console.log('play')
                spotifyApi.play();
            }
            // console.log('play')
            // spotifyApi.play();
        }
        else if (command.includes('????????????')) {
            spotifyApi.pause();
        }else if (command.includes('????????????') && command.includes('????????????')){
            spotifyApi.play();
        } else if (command.includes('???????????????')) {
            spotifyApi.skipToNext();
        } else if (command.includes('????????????????????????')) {
            spotifyApi.skipToPrevious();
        } else if (command.includes('??????????????????') && command.includes('??????')) {
            let sec =0;
            if (command.includes('?????????')) {
                sec=5000;
            } else if (command.includes('???????????????')) {
                sec=1000;
            } else if (command.includes('?????????')) {
                sec=10000;
            } else if (command.includes('??????????????????')) {
                sec=20000;
            }
            spotifyApi.getMyCurrentPlayingTrack().then(res =>{
                if (res.body !== null) {
                    spotifyApi.seek(res.body.progress_ms+sec);
                }
            })
        }  else if (command.includes('??????????????????') && command.includes('????????????')) {
            let sec =0;
            if (command.includes('?????????')) {
                sec=5000;
            } else if (command.includes('???????????????')) {
                sec=1000;
            } else if (command.includes('?????????')) {
                sec=10000;
            } else if (command.includes('??????????????????')) {
                sec=20000;
            }
            spotifyApi.getMyCurrentPlayingTrack().then(res =>{
                if (res.body !== null) {
                    spotifyApi.seek(Math.max(0,res.body.progress_ms-sec));
                }
            })
        } else if (command.includes('????????????')) {
            console.log('rock')
            setCategory(cat["????????????"])
        } else if (command.includes('???????????????')) {
            console.log('rock')
            setCategory('rock')
        } else if (command.includes('??????') && command.includes('???????????????')){
            console.log('lyric')
            setSongLyric(true)
        }

    }, [text]);
    
    return (
        <Layout style={{height:"100vh"}}>
            <Router>
            <Navigation homeToNav={homeToNav}/>
            <Switch>
                <Route exact path="/"><Home Song={song} showLyric={songLyric}/></Route>
                <Route exact path="/search" ><SearchResult sendSong={sendSong} category={category}/></Route>
                <Route exact path="/playlist" component={Playlist}></Route>
                <Route exact path="/lyrics" component={Lyrics}></Route>
            </Switch>
            </Router>
        </Layout> 
    );
}

const useStyles = makeStyles((theme) => createStyles({
    header : {
        backgroundColor: '#f0f2f5',
        margin: 10,
        padding: 10,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1890ff',
        textAlign: 'left'
    }

}));


    