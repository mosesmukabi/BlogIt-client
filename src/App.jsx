import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/header/header";
import HeaderFeeds from "./components/HeaderFeeds/HeaderFeeds";
import Footer from "./components/footer/footer";
import LandingPage from "./components/LandingPage/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/signup";
import LoginPage from "./pages/login/login";
import Feeds from "./pages/feeds/feeds";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import WritePage from "./pages/write/write";
import FullBlog from "./pages/FullBlog/FullBlog";
import MyBlogs from "./pages/myBlogs/myBlogs";
import EditPage from "./pages/Edit/Edit";
import EditedFullBlog from "./pages/EditedFullBlog/EditedFullBlog";
import UpdateProfile from "./pages/updatePersonalInfo/updatePersonalInfo";

const client = new QueryClient();

function AppContent() {
  const { state } = useAuth();

  return (
    <>
      {state.isLoggedIn ? <HeaderFeeds /> : <Header />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/blog/:id" element={<FullBlog />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/editBlog/:id" element={<EditPage />} />
        <Route path="/blog/edited/:id" element={<EditedFullBlog />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
      </Routes>

      <Footer />
      <ToastContainer autoClose={1000} />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
