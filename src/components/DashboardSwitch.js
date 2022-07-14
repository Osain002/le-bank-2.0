import React from 'react'


const DashboardSwitch = (props) => {



   return (
      <div className='dash-switch'>
         <div className='left'
            onClick={() => props.setIsClickedOn('dashboard')}
            style={{
               backgroundImage: (props.isClickedOn === 'dashboard') ? 'linear-gradient( rgb(112, 112, 112), rgb(191, 191, 191))' : 'linear-gradient(rgb(191, 191, 191), rgb(112, 112, 112))'
            }}
         >
            Dash
         </div>

         <div className='right'
            onClick={() => props.setIsClickedOn('cards')}
            style={{
               backgroundImage: (props.isClickedOn === 'cards') ? 'linear-gradient( rgb(112, 112, 112), rgb(191, 191, 191))' : 'linear-gradient(rgb(191, 191, 191), rgb(112, 112, 112))'
            }}
         >
            My Cards
         </div>
      </div>
   )
}

export default DashboardSwitch;