import React from 'react';

import { create } from "react-test-renderer";

import { CanvasScreen } from '../screens/CanvasScreen';

test("Matches the snapshot", () => {
    const button = create(<CanvasScreen />);
    expect(button.toJSON()).toMatchSnapshot();
  });
