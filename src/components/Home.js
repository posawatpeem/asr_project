import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import SongQueue from '../components/SongQueue';
import Player from '../components/Player';
import {makeStyles, createStyles} from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-node';

const { Header, Content, Footer, Sider } = Layout;

const spotifyApi = new SpotifyWebApi({
    clientId: 'b6d7bafeb31a49f4b7cae4176f4d3cef',
    accessToken: localStorage.getItem("access_token")
})

export default function Home() {
    
    const classes = useStyles();
    const [currentQueue, setCurrentQueue] = useState([]);
    const [shuffle, setShuffle] = useState(false);

    useEffect(() => {
        //setCurrentQueue(songs) songs for every page
        // if (currentQueue.length === 0) {
        //     spotifyApi.searchTracks("love").then(res => {
        //         setCurrentQueue(
        //             res.body.tracks.items.map(track => {
        //               const smallestAlbumImage = track.album.images.reduce(
        //                 (smallest, image) => {
        //                   if (image.height < smallest.height) return image
        //                   return smallest
        //                 },
        //                 track.album.images[0]
        //               )
            
        //               return {
        //                 artist: track.artists[0].name,
        //                 title: track.name,
        //                 uri: track.uri,
        //                 albumUrl: smallestAlbumImage.url,
        //               }
        //             })
        //           );
        //     spotifyApi.getMyDevices
        //     ().then(res => {
        //         console.log(res.body);
        //     })
        //     });
        // }
        
    }, currentQueue.length);

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

