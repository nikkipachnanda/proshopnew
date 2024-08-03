import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <Container>
        <h1>Welcome to Proshop </h1>
        <Outlet/>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
