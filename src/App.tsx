import React from 'react';

import './App.scss';
import {CanvasScreen} from "./screens/CanvasScreen";
import { AppBar } from './components/AppBar/AppBar';
import {Footer} from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      
      <AppBar></AppBar>
      
      <div>
        <CanvasScreen/>
      </div>

        <Footer></Footer>

    </div>
  );
}

export default App;
