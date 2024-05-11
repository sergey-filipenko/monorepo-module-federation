import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import {Suspense} from "react";
import {About} from "@/pages/about";

const routes =  [
  {
    path: '/admin/about',
    element: (
      <Suspense fallback='Loading...'>
        <About />
      </Suspense>
    ),
  },
];
export const router = createBrowserRouter([
  {
    path: '/admin',
    element: <App />,
    children: routes,
  },
]);
export default routes;