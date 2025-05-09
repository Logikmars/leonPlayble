import { useEffect, useRef, useState } from 'react';
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

  const audioRef = useRef(null);

  useEffect(() => {
    if (click === 1) {
      audioRef.current.play();
    }
  }, [click]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
    }
  }, [])

  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  window.addEventListener('resize', setVH);
  setVH();

  return (
    <div className="App">
      <audio ref={audioRef} src="/img/mainSound.mp3" loop autoPlay />
      <div className="App_title transform free_img">
        <img src="/img/mostbet.svg" alt="" />
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
      <div className='App_lastScreen_wrapper free_img'>
        <div className={`App_lastScreen free_img opacity ${showLastScreen ? 'App_lastScreen_show' : ''}`}>
          <div className="App_title transform free_img">
            <img src="/img/title.webp" alt="" />
          </div>
          <div className='App_lastScreen_decor_leftCoin free_img'>
            <img src="/img/coinsLeft.webp" alt="" />
          </div>
          <div className='App_lastScreen_title free_img'>
            Tebrikler! <br></br>
            Kazandınız!
          </div>
          <div className='App_lastScreen_description_wrapper free_img'>
            <div className='App_lastScreen_description'>

              60.000 TL bonus <br></br>
              ve 200 free spin kazandınız!
              <Btn title="BONUS Al" onclick={() => { FbPlayableAd.onCTAClick() }} />
            </div>
          </div>
          <div className='App_lastScreen_decor_rightCoin free_img'>
            <img src="/img/coinsRight.webp" alt="" />
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
