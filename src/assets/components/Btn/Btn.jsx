import './Btn.scss';
export default ({ onclick, click, title}) => {

    return (
        <div className='Btn_border'>
            <div className={`Btn ${click === 3 ? 'Btn_disabled' : ''}`} onClick={onclick} style={click === 3 ? { background: 'linear-gradient(to bottom, #D9D9D9, #D9D9D9)' } : {}}
            disabled={click === 3}
            >
                {title}
            </div>
        </div>
)}