import './App.scss';
import Btn from './assets/components/Btn/Btn';
import GreenLabel from './assets/components/GreenLabel/GreenLabel';

function App() {
  return (
    <div className="App">
        <div className="App_title">
          <img src="/img/title.webp" alt="" />
        </div>
        <div className='App_decorBallRight free_img'>
          <img src="/img/rightJackpot.webp" alt="" />
        </div>
        <div className='App_coinVolcano'>
          <img src="/img/coinVolcano.webp" alt="" />
        </div>
        <div className='App_green'>
          <GreenLabel />
        </div>
        <div className='App_table'>
          <img src="/img/table.webp" alt="" />
        </div>
        <div className='App_btn'>
          <Btn />
        </div>
        <div className='App_decorBallLeft free_img'>
          <img src="/img/leftJackpot.webp" alt="" />
        </div>
        <div className='App_decorFlame free_img'>
          <img src="/img/flame.webp" alt="" />
        </div>
    </div>
  )
}

export default App
