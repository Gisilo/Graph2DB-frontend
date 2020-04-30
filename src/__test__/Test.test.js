import React from 'react';
import { create } from "react-test-renderer";
import { MockedProvider } from '@apollo/react-testing';
import {AppBar} from "../components/AppBar/AppBar";
import {Footer} from "../components/Footer/Footer";
import { SaveButton, CreateButton, DeleteButton, LoadButton} from '../components/buttons';



describe('Button Tests', () => {

    test('SaveButton matches the snapshot', () => {
        const button = create(
            <MockedProvider addTypename={false}>
                <SaveButton />
            </MockedProvider>
        );
        expect(button.toJSON()).toMatchSnapshot();
    });

    test('DeleteButton matches the snapshot', () => {
        const button = create(
            <MockedProvider addTypename={false}>
                <DeleteButton />
            </MockedProvider>
        );
        expect(button.toJSON()).toMatchSnapshot();
    });

    test('LoadButton matches the snapshot', () => {
        const button = create(
            <MockedProvider addTypename={false}>
                <LoadButton />
            </MockedProvider>
        );
        expect(button.toJSON()).toMatchSnapshot();
    });

    test("CreateButton matches the snapshot", () => {
        const button = create(
            <MockedProvider>
                <CreateButton />
            </MockedProvider>
        );
        expect(button.toJSON()).toMatchSnapshot();
    });
});


describe('AppBar Tests', () => {
    test("AppBar matches the snapshot", () => {
        const bar = create(
            <MockedProvider>
                <AppBar />
            </MockedProvider>
        );
        expect(bar.toJSON()).toMatchSnapshot();
    });
});


describe('Footer Tests', () => {
    test("Footer matches the snapshot", () => {
        const footer = create(
            <MockedProvider>
                <Footer />
            </MockedProvider>
        );
        expect(footer.toJSON()).toMatchSnapshot();
    });
});
