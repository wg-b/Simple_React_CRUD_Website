import { useAppSelector } from "store";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/Home";
import Help from "pages/Help";
import SignIn from "pages/sign-in/SignIn";
import SignUp from "pages/sign-up/SignUp";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import ContacUs from "pages/ContactUs";
export default function App() {
  const userToken = useAppSelector((state) => state.auth.accessToken);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-play" element={<Help />} />
        <Route path="/contact-us" element={<ContacUs />} />
        {!userToken && (
          <>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
