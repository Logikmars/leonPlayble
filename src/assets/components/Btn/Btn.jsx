import './Btn.scss';
export default ({ onclick, click, title}) => {

    return (
        <div className='Btn_border'>
            <div className={`Btn ${click === 3 ? 'Btn_disabled' : ''}`} onClick={onclick}
            disabled={click === 3}
            >
                {title}
            </div>
        </div>
)}