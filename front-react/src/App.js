import { BrowserRouter as Router } from 'react-router-dom';
import Public from './Routes/Public';
import Menu from './Components/Menu'

const styles = {
  app:{
    textAlign:'center'
  }
}

function App() {
  return (
    <div style={styles.app}>
      <Router>
        <Menu />
        <Public />
      </Router>
    </div>
  );
}

export default App;
