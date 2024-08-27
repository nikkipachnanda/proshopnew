import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <h1>Welcome to Proshop</h1>
          <Outlet />
        </Container>
      </main>
      <Footer />
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
