import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <Container>
        <h1>Welcome to Proshop </h1>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
