import React from 'react';

import { create } from "react-test-renderer";


import App from '../App';
import { CanvasScreen } from '../screens/canvas_screen';

test("Matches the snapshot", () => {
    const button = create(<CanvasScreen />);
    expect(button.toJSON()).toMatchSnapshot();
  });
