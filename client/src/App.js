import './App.css';

import ApiHandler from './API/ApiHandler';

import Login from './modules/forms/Login';
import Register from './modules/forms/Register';

function App() {

  ApiHandler.IsServerOnline();

  return (
    <div className="App">
      <Register/>
    </div>
    
  );
}

export default App;
