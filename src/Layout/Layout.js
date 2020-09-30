import React from 'react' 
import Header from '../components/Header/Header' 
import classes from './Layout.module.scss' 

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <Header />
      <main>
        <div className="container">{props.children}</div>
      </main>
    </div>
  ) 
} 

export default Layout 
