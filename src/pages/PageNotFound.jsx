import React from 'react'
import errorPage from '../assets/404page.gif'
import { Link } from 'react-router-dom';



function PageNotFound() {
  return (
    <div id="wrapper">
      <img style={{maxWidth:'500px'}} src={errorPage} alt='man seeing a 404 sign'/>
      <div id="info">
        <h1 style={{fontSize:'2.75em', fontWeight:'lighter'}}>Page not found</h1>
        <Link to={'/'}>
          <h3 style={{fontWeight:'lighter'}}>Go back to the homepage</h3>
        </Link>
      </div>
    </div >
  )
}

export default PageNotFound