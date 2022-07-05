import React from 'react'

const Account = (props) => {
  
  const sortcode = String(props.accInfo.sortcode);
  return (
    <div className='account-container'>
      <div className='centerHorizontal balance'>
        <p>
          £{props.accInfo.balance.toFixed(2)}
        </p>
      </div>

      <div className='acc-info centerHorizontal'> 
        <p>
          {
            sortcode.substring(0,2) + '-' + sortcode.substring(2,4) + '-' + sortcode.substring(4,6)
          } 
        </p>

        <p>
          {props.accInfo.accNum}
        </p>

      </div>
      
    </div>
  )
}

export default Account