import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import SignupPage from './pages/signup/signup';
import LoginPage from './pages/login/login';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
    
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Other routes */}
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
