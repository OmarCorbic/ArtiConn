import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ProtectedRoutes from "./features/auth/ProtectedRoutes";
import Layout from "./components/Layout";
import Public from "./components/Public";
import AdsList from "./features/ads/AdsList";
import ProtectedLayout from "./components/ProtectedLayout";
import UserProfileLayout from "./features/user/UserProfileLayout";
import PersistLogin from "./features/auth/PersistLogin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Public />} />

      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>

      <Route element={<PersistLogin />}>
        <Route element={<ProtectedRoutes />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/feed" element={<AdsList />} />
            <Route path="/profile/:id" element={<UserProfileLayout />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
