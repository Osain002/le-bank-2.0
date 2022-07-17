import React from 'react'


import { useState } from 'react';
import { useEffect } from 'react';

const Card = (props) => {

    const [cardnum, setCardNum] = useState("")

    console.log(props.account[0])

    function splitCardNum(cardNum) {
        var numString = "";
        for (var x = 0; x <= 12; x += 4) {
            numString += String(cardNum).substring(x, x + 4) + " ";
        }
        return numString
    }

    useEffect(() => {
        props.account[0].cardDetails[0].cardNum?(
            setCardNum(splitCardNum(props.account[0].cardDetails[0].cardNum))
        ):(
            console.log('error')
        )
    }, [props])



    return (
        <div className='debit-card'>
            <div className='card-number'>
                {
                    cardnum?cardnum: <p>error</p>
                }
            </div>

            <div className='sortcode'>
                sortcode
            </div>
        </div>
    )
}

export default Card