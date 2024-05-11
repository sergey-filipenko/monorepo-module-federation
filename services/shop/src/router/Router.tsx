import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import {Suspense} from "react";
import {Shop} from "@/pages/shop";
import { shopRoutes } from '@packages/shared/src/routes/shop';



const routes = [
  {
    path: shopRoutes.main,
    element: (
      <Suspense fallback='Loading...'>
        <Shop />
      </Suspense>
    ),
  },
  {
    path: shopRoutes.second,
    element: (
      <Suspense fallback='Loading...'>
        <div style={{color: 'red'}}>Second</div>
      </Suspense>
    ),
  },

];
export const router = createBrowserRouter([
  {
    path: '/shop',
    element: <App />,
    children: routes
  },
]);
export default routes;