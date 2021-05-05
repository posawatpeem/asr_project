import { Layout, Menu, Input} from 'antd';
import { InfoCircleOutlined, PlayCircleOutlined , SearchOutlined, HomeOutlined ,ReadOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {makeStyles, createStyles} from '@material-ui/core'
import 'antd/dist/antd.css';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { useState } from 'react';


const { Sider } = Layout;
const { TextArea } = Input;

export default function Navigation() {
    const history = useHistory();
    const classes = useStyles();

    const [isRecord,setIsRecord] = useState(null);
    
    const start = () => {
        setIsRecord(RecordState.START);
    }
     
    const stop = () => {
        setIsRecord(RecordState.STOP);
    }
     
    const onStop = (audioData) => {
        console.log('audioData', audioData)
    }
    
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
        <div className={classes.logo}>
            <h2 style={{color: "white", textAlign: 'center'}}>Spotifo</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined  />} onClick={() => history.push('/')}>
            Home
            </Menu.Item>
            <Menu.Item key="2" icon={<SearchOutlined />} onClick={() => history.push('/search')}>
            Search 
            </Menu.Item>
            <Menu.Item key="3" icon={<InfoCircleOutlined />} onClick={() => history.push('/song-detail')}>
            Song Detail
            </Menu.Item>
            <Menu.Item key="4" icon={<PlayCircleOutlined />} onClick={() => history.push('/playlist')}>
            Playlist
            </Menu.Item>
            <Menu.Item key="5" icon={<ReadOutlined />} onClick={() => history.push('/lyrics')}>
            Lyrics
            </Menu.Item>
        </Menu>
        <div className={classes.input}>
            <TextArea rows={3} disabled={true} placeholder="Voice command" />
        </div>
        <div className={classes.button_container}>
            <button onClick={start} className={classes.button}>Start</button>
            <AudioReactRecorder className={classes.recorder} state={isRecord} onStop={onStop} canvasWidth="0" canvasHeight="0" />
            <button onClick={stop} className={classes.button}>Stop</button>
        </div> 
        </Sider> 
        
    );
}

const useStyles = makeStyles((theme) => createStyles({
    logo :  {
        height: "32px",
        margin: "16px",
        background: 'rgba(255, 255, 255, 0.2)'
    },
    button : {
        width: 50,
        height: 30,
        margin: 10,
        borderRadius: 10,
        fontSize: 16
    },
    button_container : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    recorder : {
        width: 0,
        height: 0
    },
    input : {
        marginTop: 20,
        padding: 10,
        fontSize: 14
    }
}));