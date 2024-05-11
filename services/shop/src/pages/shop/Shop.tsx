import React from 'react';
import {Link} from "react-router-dom";
import { shopRoutes } from '@packages/shared/src/routes/shop';

const Shop = () => {
  return <h1>SHOP <div><Link to={shopRoutes.second} >Second</Link></div></h1>;
};

export default Shop;
