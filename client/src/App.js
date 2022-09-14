import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from './components/LandingPage/LandingPage.jsx';
import { Home } from './components/Home/Home.jsx';
import { DogDetail } from './components/DogDetail/DogDetail';
import { CreatedDog } from './components/CreatedDog/CreatedDog.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route path='/create' component={CreatedDog} />
          <Route path='/home/:id' component={DogDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
