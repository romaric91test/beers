import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customnavbar from "./components/navbar/navbar";
import Card from "./components/card/card"
import {useState} from "react";
import FavouriteCard from "./components/favouritecard/favouritecard";


function App() {
  const [favourite, setFavourite] = useState(false);
  console.log(favourite);

  return (
    <div className="App">
      <Customnavbar handleFavouritebeers={(favourite) => setFavourite(favourite)} />
      <div className="form-inline">
          {favourite ? <FavouriteCard /> : <Card />}
      </div>
    </div>
  );
}

export default App;
