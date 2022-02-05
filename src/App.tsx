import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import axios from "axios";
import AuthenticatedUser from './interfaces/AuthenticatedUser';
import { checkToken } from  "./helpers/auth";
import UserContext from './context/UserContext';
import UserUpdateContext from './context/UserUpdateContext';
import { Routes, Route, Navigate } from "react-router";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Rooms from './components/main/Rooms';
import { ToastContainer, Zoom } from "react-toastify";
import CreateRoom from './components/main/room/CreateRoom';
import Room from './components/main/room/Room';
import EditRoom from './components/main/room/EditRoom';
import DeleteRoom from './components/main/room/DeleteRoom';
import EditProfile from './components/main/EditProfile';
import APIURL from './helpers/urlSwitch';

function App() {
  const [loading, setLoading] = useState(true);
  const [endpoint, setEndpoint] = useState('');
  const [CurrentUser, setCurrentUser] = useState<AuthenticatedUser>({
    id: null,
    token: null,
    email: "",
    username: "",
    avatar: ""
  });

  const fireTest = async () => {
    let url = `${APIURL}/WeatherForecast`;
    let request: any = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log(request)
    setEndpoint(request)
  }

  useEffect(() => {
    fireTest();
  }, [])

  return (
    <UserContext.Provider value={CurrentUser}>
      <UserUpdateContext.Provider value={setCurrentUser}>
        <div className="app">
          {/* TEST CORS REQUEST */}
          {/* {
            loading ?
              ""
              : <span>{endpoint}</span>
          } */}
          {/* Switch */}
          <Routes>
            {/* Rooms */}
            <Route path="/rooms" element={<Rooms />} />
            {/* View Room */}
            <Route path="/room/:id" element={<Room />} />
            {/* Create Post */}
            <Route path="/create-room" element={<CreateRoom />} />
            {/* Edit Room */}
            <Route path="/edit-room/:id" element={<EditRoom />} />
            {/* Delete Post */}
            <Route path="/delete-room/:id" element={<DeleteRoom />} />
            {/* Edit Profile */}
            <Route path="/edit-profile" element={<EditProfile />} />
            {/* Login */}
            <Route path="/login" element={<Login />} />
            {/* Signup */}
            <Route path="/signup" element={<Signup />} />
            {/* Catch root */}
            <Route path="/" element={<Navigate to='/rooms' />} /> 
          </Routes>
          <ToastContainer 
                position="bottom-center"
                closeButton={false}
                hideProgressBar={true}
                draggable={false}
                transition={Zoom}
                limit={1}
                autoClose={2000}
          />
        </div>
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}

export default App;