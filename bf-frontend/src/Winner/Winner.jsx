import React from 'react';
import "./Winner.css";
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

  React.useEffect(() => {
    let timeOut;
    if (showPopup) {
      timeOut = setTimeout(() => {
        setShowPopup(false);
      }, 7000);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [showPopup]);

  const fetchWinner = async () => {
    try {
      const res = await axios.get("http://localhost:2008/getwinner");

      if (res.data.winner) {
        setPopUpMsg("The winner is " + res.data.winner);
        setShowPopup(true);
        setConfettiActive(true); // Activate confetti when winner is fetched
      } else {
        setPopUpMsg("The winner will be declared at 10 PM");
        setShowPopup(true);
        setConfettiActive(true)
      }
    } catch (error) {
      alert("An error occurred while fetching winner");
    }
  };

  const clickHandle = () => {
    setShowPopup(false);
    setConfettiActive(false); // Deactivate confetti when popup is closed
  };

  return (
    <div className='winner-container'>
      <div className='winner-data'>
        <button onClick={fetchWinner} className='get-winner-button'>
          Get Winner
        </button>
      </div>
      {showPopup && (
        <Popup popUpMsg={popUpMsg} handleClick={clickHandle} />
      )}
      <Confetti active={confettiActive} />
    </div>
  );
};

export default Winner;
