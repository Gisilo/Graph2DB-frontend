import * as React from 'react';
import { create } from "react-test-renderer";
import { MockedProvider } from "@apollo/react-testing";
import GrabitCreatorBtn from '../components/buttons/GrabitCreatorBtn';

describe('GrabitCreator Tests', () => {
  test("Matches the snapshot", () => {
    const button = create(
      <MockedProvider>
        <GrabitCreatorBtn />
      </MockedProvider>
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
});
