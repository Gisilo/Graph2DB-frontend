import React from 'react';

import './App.css';
import {CanvasScreen} from "./screens/CanvasScreen";
import { AppBar } from './components/AppBar/AppBar';

function App() {
  return (
    <div className="App">
      
      <AppBar></AppBar>
      
      <div>
        <CanvasScreen/>
      </div>

    </div>
  );
}

export default App;
