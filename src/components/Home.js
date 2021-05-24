import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import SongQueue from '../components/SongQueue';
import Player from '../components/Player';
import {makeStyles, createStyles} from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-node';
import Lyric from './Lyrics';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

const spotifyApi = new SpotifyWebApi({
    clientId: 'b6d7bafeb31a49f4b7cae4176f4d3cef',
    accessToken: localStorage.getItem("access_token")
})

const lyricsFinder = require('lyrics-finder');

export default function Home({Song,showLyric}) {
    
    const classes = useStyles();
    const [currentQueue, setCurrentQueue] = useState([]);
    const [shuffle, setShuffle] = useState(false);
    const [lyrics,setLyrics] = useState("");


    useEffect(() => {
        //if (currentQueue.length === 0) {
            setCurrentQueue(
                Song.map(track => {
                    //console.log(track.track.album.images)
                    const smallestAlbumImage = track.track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    },
                    track.track.album.images[0]
                    )
        
                    return {
                    artist: track.track.artists[0].name,
                    title: track.track.name,
                    uri: track.track.uri,
                    albumUrl: smallestAlbumImage.url,
                    }
                }).slice(0,5)
                );   
        //}
        
    }, []);

    function chooseTrack(selectedTrack) {
        let index = 0;
        for (let track of currentQueue){
            if (selectedTrack.uri === track.uri){
                break;
            }
            index++;
        }
        setCurrentQueue(currentQueue.slice(index,currentQueue.length));
        //songs =  currentQueue    update songs for every page
    }

    function handlePause() {
        spotifyApi.pause();
    }

    function handlePlay() {
        spotifyApi.play();
    }

    function handleNext() {
        spotifyApi.skipToNext();
    }

    function handlePrevious() {
        spotifyApi.skipToPrevious();
    }
    
    function handleRepeat() {
        spotifyApi.setRepeat("context");
    }
    
    function handleShuffle() {
        spotifyApi.setShuffle(!shuffle);
        setShuffle(!shuffle);
    }

    function handleSeek(){
        spotifyApi.seek(30000);
    }
        
    useEffect(() => {
        console.log(showLyric)
        if (showLyric) {
            spotifyApi.getMyCurrentPlayingTrack().then(res =>{
                //return res.body.artists[0].name, res.body.name
                //console.log(res.body)
                if (res.body !== null) {
                    axios
                    .get("http://localhost:3001/lyrics", {
                        params: {
                        track: res.body.item.name,
                        artist: res.body.item.artists[0].name,
                        },
                    })
                    .then(res => {
                        if (res.data !== null) {
                            setLyrics(res.data.lyrics)
                        }
                    })
                }
            })
        } else {
            setLyrics('')
        }  
      })
        
        
    
    return (
        <Layout style={{height:"100vh"}}>
             {/* <Header className={classes.header} onClick={handlePause}>Stop</Header>
             <Header className={classes.header} onClick={handlePlay}>Play</Header>
             <Header className={classes.header} onClick={handleNext}>Next</Header>
             <Header className={classes.header} onClick={handlePrevious}>Prev</Header>
             <Header className={classes.header} onClick={handleRepeat}>re</Header>
             <Header className={classes.header} onClick={handleShuffle}>shuffle</Header>
             <Header className={classes.header} onClick={handleSeek}>to30</Header> */}

             <Content style={{ margin: '24px 16px 0'}}> 
                {console.log(spotifyApi.getMyCurrentPlayingTrack)}
                <div>
                    <Player trackUris={currentQueue.map(track => track.uri)} />
                </div>
                {/* <div>shuffle:{shuffle}</div> */}
                <div>
                    {currentQueue.map(track => (
                        <SongQueue
                            track={track}
                            key={track.uri}
                            chooseTrack={chooseTrack}
                        />
                    ))}
                </div>
                <div>
                    
                    <Lyric lyrics={lyrics}></Lyric>
                </div>
             </Content>
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


