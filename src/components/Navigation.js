import { Layout, Menu, Input} from 'antd';
import { InfoCircleOutlined, PlayCircleOutlined , SearchOutlined, HomeOutlined ,ReadOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {makeStyles, createStyles} from '@material-ui/core'
import 'antd/dist/antd.css';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { useState, useEffect } from 'react';
import ScriptTag from 'react-script-tag';
import Client from '../model/client';


const { Sider } = Layout;
const { TextArea } = Input;

export default function Navigation({homeToNav}) {
    
    const history = useHistory();
    const classes = useStyles();

    const [isRecord,setIsRecord] = useState(null);
    const [text, setText] = useState('');
    
    // const start = () => {
    //     console.log("start record");
    //     setIsRecord(RecordState.START);
    // }
     
    // const stop = () => {
    //     console.log("stop record");
    //     setIsRecord(RecordState.STOP);
    // }
     
    // const onStop = (audioData) => {
    //     console.log('audioData', audioData)
    // }
    function getText(t) {
        //console.log(t);
        setText(t);
    }
    
    useEffect(() => {
        console.log(text);
        homeToNav(text);
    }, [text]);

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
                <Menu.Item key="3" icon={<PlayCircleOutlined />} onClick={() => history.push('/playlist')}>
                Playlist
                </Menu.Item>
                <Menu.Item key="4" icon={<ReadOutlined />} onClick={() => history.push('/lyrics')}>
                Lyrics
                </Menu.Item>
            </Menu>
            <Client getText={getText}/>
        </Sider> 
        
    );
    
}

const useStyles = makeStyles((theme) => createStyles({
    logo :  {
        height: "32px",
        margin: "16px",
        background: 'rgba(255, 255, 255, 0.2)'
    },
    start_button : {
        width: 50,
        height: 30,
        margin: 10,
        borderRadius: 5,
        fontSize: 16,
        color: 'white',
        backgroundColor: 'green',
        borderColor: '#009018'
    },
    stop_button : {
        width: 50,
        height: 30,
        margin: 10,
        borderRadius: 5,
        fontSize: 16,
        color: 'white',
        backgroundColor: 'red',
        borderColor: '#E11803'
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