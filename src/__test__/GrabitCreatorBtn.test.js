import * as React from 'react';
import { create } from "react-test-renderer";
import { MockedProvider } from "@apollo/react-testing";
import CreateButton from '../components/buttons/CreateButton';

describe('GrabitCreator Tests', () => {
  test("Matches the snapshot", () => {
    const button = create(
      <MockedProvider>
        <CreateButton />
      </MockedProvider>
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
});
