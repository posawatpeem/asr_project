import {makeStyles, createStyles} from '@material-ui/core'
import { Layout} from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default function SongDetail() {
    const classes = useStyles();
    
    return (
        <Layout style={{height:"100vh"}}>
             <Header className={classes.header}>Song Details</Header>
             <Content style={{ margin: '24px 16px 0', backgroundColor:'blue'}}>
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