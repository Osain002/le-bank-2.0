

import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Transfer = (props) => {

   const [senderAccNum, setSenderAccNum] = useState(); //track which account to send funds from
   const [fname, setFname] = useState(); //track state of recipient first name
   const [lname, setLname] = useState(); //track state of recipient last name
   const [sortcode, setSortcode] = useState(); //track state of recipient sortcode
   const [recipAccNum, setRecipAccNum] = useState(); //track state of recipient account number
   const [sendAmount, setSendAmount] = useState();
   const [reference, setReference] = useState();



   function handleTransfer(event) {
      event.preventDefault();
      const url = "http://localhost:8080/transfer/";

      const requestJson = {
         "recipFname": fname,
         "recipLname": lname,
         "transfer": sendAmount,
         "senderAccNum": senderAccNum,
         "recipSortCode": sortcode,
         "recipAccNum": recipAccNum,
         "ref": reference,
         "senderFname": props.name[0],
         "senderLname": props.name[1]
      };

      axios.post(url, requestJson)
         .then(props.setRefresh(true))
   }


   return (
      <div className='transfer-container' disabled>
         <div>
            <form onSubmit={handleTransfer}>
               <label>From: </label>
               <select
                  name="accSelect"
                  onChange={(e) => setSenderAccNum(e.target.value)}
                  required
               >
                  <option id='transForm' value='none'>Select</option>
                  {
                     props.accounts.map((acc) => <option
                        key={acc.accNum}
                        value={acc.accNum}
                     >
                        {acc.accNum}
                     </option>
                     )
                  }
               </select>

               <p>To: </p>

               <label>Firstname:</label>
               <input
                  size="80"
                  type='text'
                  placeholder='Type here...'
                  onChange={(e) => setFname(e.target.value)}
                  required
               />

               <label>Last name:</label>
               <input
                  name='fname'
                  type='text'
                  placeholder='Type here...'
                  onChange={(e) => setLname(e.target.value)}
                  required
               />

               <label>Sort code:</label>
               <input
                  type='text'
                  placeholder='Type here...'
                  onChange={(e) => setSortcode(e.target.value)}
                  required
               />

               <label>Acc. Num:</label>
               <input
                  type='text'
                  placeholder='Type here...'
                  onChange={(e) => setRecipAccNum(e.target.value)}
                  required
               />

               <label>Amount:</label>
               <input
                  type='number'
                  step="0.01"
                  min='0'
                  placeholder='Enter amount...'
                  onChange={(e) => setSendAmount(e.target.value)}
                  required
               />

               <label>Reference:</label>
               <input
                  type='text'
                  placeholder='Type here...'
                  onChange={(e) => setReference(e.target.value)}
                  required
               />

               <input type='submit' value="Transfer" />
            </form>
         </div>
      </div>
   )
}

export default Transfer