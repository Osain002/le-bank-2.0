import React from 'react'
import { useEffect } from 'react'

const StatementEntry = (props) => {
    useEffect(() => {
        console.log(props.transInfo)
    },[props.transInfo])
  return (
    <div className='statement-entry'>
        text
    </div>
  )
}

export default StatementEntry