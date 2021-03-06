import {makeStyles, createStyles} from '@material-ui/core'
import { Layout} from 'antd';



const { Header, Content, Footer, Sider } = Layout;


export default function Lyrics(props) {
    
    const classes = useStyles();
    
    return (
        //<h1>test</h1>
        <Layout style={{height:"50vh"}}>
             <Header className={classes.header}>Lyrics</Header>
             <Content style={{ margin: '24px 16px 0', backgroundColor:'#f0f2f5'}}>
                 {props.lyrics}
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