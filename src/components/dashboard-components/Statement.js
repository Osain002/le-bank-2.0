import React from 'react'
import StatementEntry from './StatementEntry'

const Statement = (props) => {

    
  return (
    <div className='statement-container'>
        {
            props.statement.map((transaction) => <StatementEntry key={transaction._id} transInfo={transaction} /> )
        }
    </div>
  )
}

export default Statement