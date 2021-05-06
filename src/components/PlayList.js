import {makeStyles, createStyles} from '@material-ui/core'
import { Layout} from 'antd';
import SpotifyWebApi from 'spotify-web-api-node';
import { useEffect, useState } from 'react';
import SongQueue from '../components/SongQueue';

const { Header, Content, Footer, Sider } = Layout;
const spotifyApi = new SpotifyWebApi({
    clientId: 'b6d7bafeb31a49f4b7cae4176f4d3cef',
    accessToken: localStorage.getItem("access_token")
})

export default function Playlist() {
    const classes = useStyles();
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [currentQueue, setCurrentQueue] = useState([]);

    useEffect(() => {
        //if (!search) return setSearchResults([])
        
        //let cancel = false
        
        spotifyApi.getUserPlaylists().then(res => {
          //if (cancel) return
          console.log(res);
          setSearchResults(
            res.body.items.map(track => {
              const smallestAlbumImage = track.images.reduce(
                (smallest, images) => {
                  if (images.height < smallest.height) return images
                  return smallest
                },
                track.images[0]
              )
    
              return {
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            }).slice(0,10)
          )
        }).catch  ( 
            err=> console.log(err)
        )
            
        
    
      }, [])
    

    function chooseTrack(track) {
        setPlayingTrack(track);
        console.log(track);
    }
    return (
        //<h1>test</h1>
        <Layout style={{height:"100vh"}}>
             <Header className={classes.header}>Playlists</Header>
             <Content style={{ margin: '24px 16px 0'}}> 
                <div>
                    {searchResults.map(track => (
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