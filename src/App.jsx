import './App.css'
import { RecoilRoot } from "recoil";
// import Game from './game/game';
// import Rco1 from './RCO 1/Rco_1';
import ZombiesRco from './zombies/zombiesRco';

function App() {
  
  return (
    <RecoilRoot>
      <ZombiesRco/>
    </RecoilRoot>
  )
}

export default App
