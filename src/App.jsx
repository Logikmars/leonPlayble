import { useState } from 'react';
import './App.scss';
import Btn from './assets/components/Btn/Btn';
import GreenLabel from './assets/components/GreenLabel/GreenLabel';
import Table from './assets/components/Table/Table';

function App() {

  const [click, setclick] = useState(0);

  const [showLastScreen, setshowLastScreen] = useState(false);

  const handleShowLastScreen = (data) => {
    setTimeout(() => {
      setshowLastScreen(data);
    }, 500);
  };

  return (
    <div className="App">
      <div className="App_title transform free_img">
        <img src="/img/title.webp" alt="" />
      </div>
      <div className='App_decorBallRight transform free_img' style={showLastScreen ? { transform: 'translateX(100vw)' } : {}}>
        <img src="/img/rightJackpot.webp" alt="" />
      </div>
      <div className='App_coinVolcano transform free_img' style={showLastScreen ? { transform: 'translateX(-100vw)' } : {}}>
        <img src="/img/coinVolcano.webp" alt="" />
      </div>
      <div className='App_green transform free_img' style={showLastScreen ? { transform: 'translateX(-100vw)' } : {}}>
        <GreenLabel />
      </div>
      <div className='App_table transform free_img' style={showLastScreen ? { transform: 'translateY(-100vh)' } : {}}>
        <Table click={click} showLastScreen={handleShowLastScreen} />
      </div>
      <div className='App_btn transform free_img' style={showLastScreen ? { transform: 'translateY(100vh)' } : {}}>
        <Btn onclick={() => setclick(click + 1)} click={click} title="Çevir" />
      </div>
      <div className='App_decorBallLeft transform free_img' style={showLastScreen ? { transform: 'translateX(-100vw)' } : {}}>
        <img src="/img/leftJackpot.webp" alt="" />
      </div>

      <div className={`App_lastScreen free_img opacity ${showLastScreen ? 'App_lastScreen_show' : ''}`}>
        <div className="App_title transform free_img">
          <img src="/img/title.webp" alt="" />
        </div>
        <div className='App_lastScreen_title free_img'>
          Tebrikler! <br></br>
          Kazandınız!
        </div>
        <div className='App_lastScreen_description_wrapper free_img'>
          <div className='App_lastScreen_description'>

            60.000 TL bonus <br></br>
            ve 200 free spin kazandınız!
            <Btn title="BONUS Al" />
          </div>
        </div>
      </div>
      <div className='App_decorFlame transform free_img'>
        <img src="/img/flame.webp" alt="" />
      </div>
    </div>
  )
}

export default App
