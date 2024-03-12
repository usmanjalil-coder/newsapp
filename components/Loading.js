import React, { Component } from 'react'
import loading from './loading.gif'

const Loading =()=> {
 
    return (
      <div className='text-center my-4'>
        <img src={loading} alt="loading" />
      </div>
    )
 
}

export default Loading
