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
   
    useEffect(() => {
        //setCurrentQueue(songs) songs for every page
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
    
    return (
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

