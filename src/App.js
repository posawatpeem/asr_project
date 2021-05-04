import './App.css';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';

function App() {
  
  

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
