import React from 'react';
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import {adminRoutes, shopRoutes} from "@packages/shared";

export const App = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  return (
    <div data-testid='AppDataTestId'>
      <h1>PLATFORM={__PLATFORM__}</h1>
      <Link to={adminRoutes.about}>About</Link>
      <br/>
      <Link to={shopRoutes.main}>Shop</Link>
      <br />
      <Link to={shopRoutes.second}>Second</Link>
      <br />
      <h1 className={classes.value}>{count}</h1>
      <button className={classes.button} onClick={increment}>
        <span>Add</span>
      </button>
      <Outlet />
    </div>
  );
};
