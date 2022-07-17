import React from 'react'
import Card from './Card';


const CardViewMain = (props) => {
  return (
    <div className='dashboard centerHorizontal'>
      <Card account={props.account}/>
    </div>
  )
}

export default CardViewMain