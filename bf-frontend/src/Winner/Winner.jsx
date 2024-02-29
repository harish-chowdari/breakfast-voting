import React from 'react';
import './Winner.css';
import axios from 'axios';
import Confetti from 'react-dom-confetti';

const Popup = ({ popUpMsg, handleClick }) => {
  return (
    <div className='popup-container'>
      <div className='pop-content'>
        <p>{popUpMsg}</p>
        <button onClick={handleClick}>Close</button>
      </div>
    </div>
  );
};

const Winner = () => {
  const [popUpMsg, setPopUpMsg] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);
  const [confettiActive, setConfettiActive] = React.useState(false);

  const config = {
    angle: 90,
    spread: 90,
    startVelocity: 40,
    elementCount: 1000,
    dragFriction: 0.09,
    duration: 4000,
    stagger: 3,
    width: "6px",
    height: "6px",
    colors: ["#ff0000", "#00ff00", "#0000ff", "#17afdd"]
  };

  const fetchWinner = async () => {
    try {
      const res = await axios.get('http://localhost:2008/getwinner');

      if (res.data.winner) {
        setPopUpMsg('The winner is ' + res.data.winner);
        setShowPopup(true);
        setConfettiActive(true); 
      } else {
        setPopUpMsg('The winner will be declared at 10 PM');
        setShowPopup(true);
      }
    } catch (error) {
      alert('An error occurred while fetching winner');
    }
  };


  React.useEffect(() => {
    let timeOut;
    if (showPopup) {
      timeOut = setTimeout(() => {
        setShowPopup(false);
        setConfettiActive(false);
      }, 6000);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [showPopup]);

  const clickHandle = () => {
    setShowPopup(false);
    setConfettiActive(false); 
  };

  return (
    <div className='winner-container'>
      <div className='winner-data'>
        <button onClick={fetchWinner} className='get-winner-button'>
          Get Winner
        </button>
      </div>

      {showPopup && <Popup popUpMsg={popUpMsg} handleClick={clickHandle} />}
      <Confetti active={confettiActive} />
      <Confetti active={confettiActive}  config={config} />
    
    </div>
  );
};

export default Winner;
