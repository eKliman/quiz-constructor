import React from 'react';
import Header from '../components/Header/Header';
import classes from './Layout.module.scss';

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className={classes.Layout}>
        <div className="container">{props.children}</div>
      </main>
    </>
  );
};

export default Layout;
