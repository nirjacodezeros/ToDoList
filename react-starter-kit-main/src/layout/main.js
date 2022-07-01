import React from 'react'
import Header from '../components/Header';

const Main = props => {
  return (
    <>
        <Header/>
        <div className="trailit-body">{props.children}</div>
      
    </>
  )
}

export default Main
