import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';







const CardViewMain = (props) => {


  const [cardnum, setCardNum] = useState("")

  function splitCardNum(cardNum){

    var numString = "";

    for (var x=0; x<=12; x+=4){
      numString += String(cardNum).substring(x, x+4) + " ";
    }

    return numString
  }

  useEffect(() => {
    setCardNum(splitCardNum(props.account.cardNum));
  }, [props])


  const cardNum = String(props.account.cardNum);
  return (
    <div className='dashboard centerHorizontal'>
      <div className='debit-card'>
        <div>
          {
            cardnum
          }
        </div>
      </div>
    </div>
  )
}

export default CardViewMain