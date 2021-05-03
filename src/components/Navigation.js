import { Layout, Menu } from 'antd';
import { InfoCircleOutlined, PlayCircleOutlined , SearchOutlined, HomeOutlined ,ReadOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './styles.css';
import 'antd/dist/antd.css';

const { Sider } = Layout;

export default function Navigation() {
    const history = useHistory();

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
        <div className="logo">
            <h2 style={{color: "white", textAlign: 'center'}}>Spotifo</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']}>
            <Menu.Item key="1" icon={<HomeOutlined  />}>
            Home
            </Menu.Item>
            <Menu.Item key="2" icon={<SearchOutlined />} onClick={() => { history.push('/search')}}>
            Search
            </Menu.Item>
            <Menu.Item key="3" icon={<InfoCircleOutlined />}>
            Song Detail
            </Menu.Item>
            <Menu.Item key="4" icon={<PlayCircleOutlined />}>
            Playlist
            </Menu.Item>
            <Menu.Item key="5" icon={<ReadOutlined />}>
            Lyrics
            </Menu.Item>
        </Menu>
        </Sider> 
    );
}