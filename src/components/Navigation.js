import { Layout, Menu } from 'antd';
import { InfoCircleOutlined, PlayCircleOutlined , SearchOutlined, HomeOutlined ,ReadOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {makeStyles, createStyles} from '@material-ui/core'
import 'antd/dist/antd.css';

const { Sider } = Layout;

export default function Navigation() {
    const history = useHistory();
    const classes = useStyles();

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
        </Sider> 
        
    );
}

const useStyles = makeStyles((theme) => createStyles({
    logo :  {
        height: "32px",
        margin: "16px",
        background: 'rgba(255, 255, 255, 0.2)'
    }
}));