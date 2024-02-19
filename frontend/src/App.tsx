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
import EditProfile from "./features/user/EditProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Public />} />

      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>

      <Route path="/public-feed" element={<AdsList />} />

      <Route element={<PersistLogin />}>
        <Route element={<ProtectedRoutes />}>
          <Route path="/private" element={<ProtectedLayout />}>
            <Route index element={<AdsList />} />
            <Route
              path="/private/profile/:id"
              element={<UserProfileLayout />}
            />
            <Route path="/private/profile/:id/edit" element={<EditProfile />} />
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
