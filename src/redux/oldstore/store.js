// import profileReducer from "./profile-reducer";
// import dialogsReducer from "./dialogs-reducer";
// import sidebarReducer from "./sidebar-reducer";
// let store = {
//     _state: {
//         profilePage: {
//             postData: [
//                 {id: 1, message: 'Hello, how are you?', likesCount: '15'},
//                 {id: 2, message: 'Its my first post', likesCount: '20'},
//                 {id: 3, message: 'Its my second post', likesCount: '23'},
//                 {id: 4, message: 'I learn React', likesCount: '27'}
//             ],
//             newPostText: [ 'Hello my dear friend']
//         },
//         messagesPage: {
//             messagesData: [
//                 {id: 1, message: "Hi"},
//                 {id: 2, message: 'How are you'},
//                 {id: 3, message: 'what are you doing'},
//                 {id: 4, message: 'Hello'},
//                 {id: 5, message: 'Goodbye'},
//                 {id: 6, message: 'Hi'}
//             ],
//             newMessageText: ['hel'],
//             dialogsData: [
//                 {id: 1, name: 'Dmitrii'},
//                 {id: 2, name: 'Alexandr'},
//                 {id: 3, name: 'Alexey'},
//                 {id: 4, name: 'Iurii'},
//                 {id: 5, name: 'Ilya'},
//                 {id: 6, name: 'Valera'}
//             ]
//         },
//         sideBar: [
//             {name: 'Dmitrii'},
//             {name: 'Alexandr'},
//             {name: 'Alexey'}
//         ]
//     },
//     _callSubscriber() {
//         console.log('state')
//     },
//     getState(){
//         return this._state;
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer;
//     },
//     dispatch(action){
//         profileReducer(this._state.profilePage, action);
//         dialogsReducer(this._state.messagesPage, action);
//         sidebarReducer(this._state.sideBar, action);
//         this._callSubscriber(this._state);
//
//     }
// }
//
//
// window.store = store;
// export default store