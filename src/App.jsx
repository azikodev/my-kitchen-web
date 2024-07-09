//react hook
import { useEffect } from "react";

//rrd imports
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

//pages
import {
  Chart,
  Create,
  Home,
  Login,
  Recipe,
  Register,
  Trash,
  Error,
  About
} from "./pages";

//layouts
import MainLayout from "./layouts/MainLayout";

//redux
import { useSelector, useDispatch } from "react-redux";
import { login, isAuthChange } from "./app/userSlice";

//components
import { ProtectedRoutes } from "./components";

//actions
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import { action as CreateAction } from "./pages/Create";

//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthState } = useSelector((state) => state.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
          action: CreateAction,
        },
        {
          path: "/recipe/:id",
          element: <Recipe />,
        },
        {
          path: "/trash",
          element: <Trash />,
        },
        {
          path: "/chart",
          element: <Chart />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
      errorElement: <Error />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(isAuthChange());
    });
  }, []);
  return <>{isAuthChange && <RouterProvider router={routes} />}</>;
}

export default App;
