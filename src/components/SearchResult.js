import { Layout} from 'antd';
import {makeStyles, createStyles} from '@material-ui/core'

const { Header, Content, Footer, Sider } = Layout;

export default function SearchResult() {
    const classes = useStyles();
    console.log("test")
    return (
        //<h1>test</h1>
        <Layout style={{height:"100vh"}}>
             <Header className={classes.header}>Result</Header>
             <Content style={{ margin: '24px 16px 0', backgroundColor:'red'}}>
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