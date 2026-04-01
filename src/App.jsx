import './App.css'
import {recommendBrawler} from './util/recommend.js';

function App() {
    const result = recommendBrawler({ name: "TripleDribble", mode: "BrawlBall" } );

    console.log(result);
  return (
    <>
    </>
  )
}

export default App
