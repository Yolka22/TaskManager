import './App.css';

import ApiHandler from './API/ApiHandler';

function App() {

  ApiHandler.IsServerOnline();

  return (
    <div className="App">
      App
    </div>
  );
}

export default App;
