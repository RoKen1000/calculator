import './App.css';
import { Calculator } from './components/Calculator';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <h1>TypeScript Calculator</h1>
      <Calculator />
      <Footer />
    </div>
  );
}

export default App;
