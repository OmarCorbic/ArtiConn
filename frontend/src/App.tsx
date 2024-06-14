import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ProtectedRoutes from "./features/auth/ProtectedRoutes";
import Layout from "./components/Layout";
import Public from "./components/Public";
import ProtectedLayout from "./components/ProtectedLayout";
import UserProfileLayout from "./features/user/UserProfileLayout";
import PersistLogin from "./features/auth/PersistLogin";
import EditProfile from "./features/user/EditProfile";
import AdsFeed from "./features/ads/AdsFeed";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="public-feed" element={<AdsFeed />} />

          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>

        {/* Auth Routes */}

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoutes />}>
            <Route path="private" element={<ProtectedLayout />}>
              <Route index element={<AdsFeed />} />
              <Route path="profile/:id" element={<UserProfileLayout />} />
              <Route path="profile/:id/edit" element={<EditProfile />} />
            </Route>
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
