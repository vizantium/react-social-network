// import profileReducer, {addPostActionCreator} from "./profile-reducer";
// import {render, screen} from "@testing-library/react";
// import App from "../App";
//
// let state = {
//     postData: [
//         {id: 1, message: 'Hello, how are you?', likesCount: '15'},
//         {id: 2, message: 'Its my first post', likesCount: '20'},
//         {id: 3, message: 'Its my second post', likesCount: '23'},
//         {id: 4, message: 'I learn React', likesCount: '27'}
//     ]
// }
//
// test('new post should be added', () => {
//     let action = addPostActionCreator("TEST");
//
//     let newState = profileReducer(state, action)
//     expect(newState.postData.length).toBe(5)
// });
// it('new post should be added', () => {
//     let action = deletePost(1);
//
//     let newState = profileReducer(state, action)
//     expect(newState.postData.length).toBe(3)
// });
//
//
