import React from 'react';
import { create } from "react-test-renderer";
import {MockedProvider} from "@apollo/react-testing";
import App from "../App";



describe('App Tests', () => {
     test("App matches the snapshot", () => {
         const bar = create(
             <MockedProvider>
                 <App />
             </MockedProvider>
        );
         expect(bar.toJSON()).toMatchSnapshot();
     });
 });


// describe('Footer Tests', () => {
//     test("Footer matches the snapshot", () => {
//         const footer = create(
//             <MockedProvider>
//                 <Footer />
//             </MockedProvider>
//         );
//         expect(footer.toJSON()).toMatchSnapshot();
//     });
// });
