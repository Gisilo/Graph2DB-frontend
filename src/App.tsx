import React from 'react';
import Button from '@material-ui/core/Button';

import './App.css';
import {CanvasScreen} from "./screens/canvas_screen";

function App() {
  return (
    <div>
      
      <Button variant="contained" color="primary">
        Hello World
      </Button>

      <div className="App">
        <CanvasScreen/>
      </div>

    </div>
  );
}

export default App;
