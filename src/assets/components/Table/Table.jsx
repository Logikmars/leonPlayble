import { useEffect, useRef, useState } from 'react';
import './Table.scss';

export default ({ click, showLastScreen }) => {
    const [newClick, setnewClick] = useState(false);
    const [newClick2, setnewClick2] = useState(false);
    const [newClick3, setnewClick3] = useState(false);
    const [newClick4, setnewClick4] = useState(false);

    const sound1 = useRef(null);
    const sound2 = useRef(null);
    const sound3 = useRef(null);

    useEffect(() => {
        console.log('click:', click);

        if (click === 1) {
            const timer1 = setTimeout(() => {
                setnewClick(true);
                sound1.current?.play();
            }, 300);

            return () => clearTimeout(timer1);
        } else if (click === 2) {
            const timer2 = setTimeout(() => {
                setnewClick(false);
                setnewClick2(true);
                sound2.current?.play();
            }, 300);

            return () => clearTimeout(timer2);
        } else if (click === 3) {
            const timer3 = setTimeout(() => {
                setnewClick2(false);
                setnewClick3(true);

                setTimeout(() => {
                    setnewClick3(false);
                    setnewClick4(true);
                    sound3.current?.play();
                    setTimeout(() => {
                        showLastScreen(true);
                    }, 300);
                }, 2000);
            }, 300);

            return () => clearTimeout(timer3);
        } else {
            setnewClick(false);
            setnewClick2(false);
            setnewClick3(false);
        }
    }, [click]);

    return (
        <div className="Table">
                <audio ref={sound1} src="/sounds/winCoin.ogg" />
                <audio ref={sound2} src="/sounds/winCoin.ogg" />
                <audio ref={sound3} src="/sounds/lastwin.ogg" />
            <img src="/img/table.webp" alt="" />
            <div className="Table_decor free_img">
                <div
                    className={`Table_decor_mount free_img ${click ? 'Table_decor_mount_hide' : ''}`}
                >
                    <img src="/img/coinVolcano.webp" alt="" />
                </div>

                <div
                    className={`Table_decor_coin1 coin free_img ${newClick ? 'coin_show' : (newClick2 ? 'coin_hide' : '')}`}
                >
                    <img src="/img/coin7.webp" alt="" />
                </div>
                <div
                    className={`Table_decor_coin2 coin free_img ${newClick ? 'coin_show' : (newClick2 ? 'coin_hide' : '')}`}
                >
                    <img src="/img/coin5.webp" alt="" />
                </div>
                <div
                    className={`Table_decor_coin3 coin free_img ${newClick ? 'coin_show' : (newClick2 ? 'coin_hide' : '')}`}
                >
                    <img src="/img/coin5.webp" alt="" />
                </div>

                <div
                    className={`Table_decor_coin4 coin free_img ${newClick2 ? 'coin_show' : (newClick3 ? 'coin_hide' : '')}`}
                >
                    <img src="/img/coin5.webp" alt="" />
                </div>
                <div
                    className={`Table_decor_coin9 coin free_img ${newClick2 ? 'coin_show' : (newClick3 ? 'coin_hide' : '')}`}
                >
                    <img src="/img/coin5.webp" alt="" />
                </div>
                <div
                    className={`Table_decor_coin5 coin free_img ${newClick2 ? 'coin_show' : (newClick3 ? 'coin_hide' : '')}`}
                >
                    <img src="/img/coin5.webp" alt="" />
                </div>
                <div
                    className={`Table_decor_coin6 free_img ${newClick3 ? 'Table_decor_coin6_show' : (newClick4 ? 'jackpot_hide1' : '')}`}
                >
                    <img src="/img/jackpotBall.webp" alt="" />
                </div>
                <div
                    className={`Table_decor_coin7 free_img ${newClick3 ? 'Table_decor_coin7_show' : (newClick4 ? 'jackpot_hide2' : '')}`}
                >
                    <img src="/img/jackpotBall.webp" alt="" />
                </div>
                <div
                    className={`Table_decor_coin8 free_img ${newClick3 ? 'Table_decor_coin8_show' : (newClick4 ? 'jackpot_hide3' : '')}`}
                >
                    <img src="/img/jackpotBall.webp" alt="" />
                </div>
            </div>
        </div>
    );
};
