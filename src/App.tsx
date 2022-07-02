import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {UserPage} from "./components/Friends/FriendsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {LoginPage} from "./components/Login/login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'))
//const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer"))


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}


class App extends Component<MapPropsType & DispatchPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if(!this.props.initialized){
            return <Preloader />
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route path='/profile/:userId'element={
                                <React.Suspense fallback={<div><Preloader /></div>}>
                                    <ProfileContainer/>
                                </React.Suspense>
                            }/>
                            <Route path='/profile/'element={
                                <React.Suspense fallback={<div><Preloader /></div>}>
                                    <ProfileContainer/>
                                </React.Suspense>
                            }/>
                            <Route path="/dialogs/*" element={
                                 <React.Suspense fallback={<div><Preloader /></div>}>
                                <DialogsContainer/>
                                </React.Suspense>
                            }/>
                            <Route path='/news' element={<News/>}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/settings' element={<Settings/>}/>
                            <Route path='/users' element={<UserPage pageTitle={'Samurai'}/>}/>
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/chat' element={
                                <React.Suspense fallback={<div><Preloader /></div>}>
                                    <ChatPage/>
                                </React.Suspense>
                            }/>
                            <Route path="*" element={<div>404 NOT FOUND</div>} />
                            <Route path="/" element={<Navigate to="/profile" />} />
                        </Routes>

                    </div>
                </div>
            </BrowserRouter>

        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect (mapStateToProps, {initializeApp})(App);
