import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useRouteMatch, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import Navigation from '../components/Navigation';
import SearchResult from '../components/SearchResult';
import SongDetail from '../components/SongDetail';
import Playlist from '../components/PlayList';
import Lyrics from '../components/Lyrics';
import { login } from '../services/auth.service';
import {makeStyles, createStyles} from '@material-ui/core';
import SongQueue from '../components/SongQueue';
import Player from '../components/Player';
import SpotifyWebApi from 'spotify-web-api-node';

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
    const classes = useStyles();
    const [currentQueue, setCurrentQueue] = useState([]);
    const [playingTrack, setPlayingTrack ] = useState(false);
    
    useEffect(() => {
        if (window.location.search.length === 0){
            window.location.href = spotifyUrl;
        }
        else if (window.location.search.length > 0){
            handleRedirect();
            spotifyApi.searchTracks("love").then(res => {
                setCurrentQueue(
                  res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                      (smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                      },
                      track.album.images[0]
                    )
                    
                    return {
                      artist: track.artists[0].name,
                      title: track.name,
                      uri: track.uri,
                      albumUrl: smallestAlbumImage.url,
                    }
                  }).slice(0,10)
                )
              })
        }
    }, []);
    
    const handleRedirect = async () =>{
        const urlParam = new URLSearchParams(window.location.search);
        let code = urlParam.get('code');
        let payload = "grant_type=authorization_code"+
            "&code=" + code +
            "&redirect_uri="+ client_data.uri;
        const data = await login(payload);
        console.log(data);
    }
    
    function chooseTrack(track) {
        setPlayingTrack(track);
        console.log(track);
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
            <Layout style={{height:"100vh"}}>
             <Header className={classes.header}>Player</Header>
             <Content style={{ margin: '24px 16px 0'}}> 
                <div>
                    <Player trackUris={currentQueue.map(track => track.uri)} />
                </div>
                <div>
                    {currentQueue.map(track => (
                        <SongQueue
                            track={track}
                            key={track.uri}
                            chooseTrack={chooseTrack}
                        />
                    ))}
                </div>
             </Content>
            </Layout>
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


    