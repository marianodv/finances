import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Public from './Routes/Public';

function App() {
  return (
    <Router>
      <Public />
    </Router>
  );
}

export default App;
