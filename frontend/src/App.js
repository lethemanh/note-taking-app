import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { AddNote } from './pages/AddNote';
import { EditNote } from './pages/EditNote';
import { NoteDetail } from './pages/NoteDetail';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import ConfirmDialog from './components/ConfirmDialog';
import withAuth from './hocs/withAuth';
import withGuest from './hocs/withGuest';
import UserState from './context/user/userState';
import ConfirmationState from './context/confirmation/confirmationState';
import './App.css';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const pages = useMemo(
    () => ({
      Login: withGuest(Login),
      Signup: withGuest(Signup),
      Home: withAuth(Home),
      AddNote: withAuth(AddNote),
      EditNote: withAuth(EditNote),
      NoteDetail: withAuth(NoteDetail),
    }),
    [],
  );

  return (
    <>
      <UserState>
        <ConfirmationState>
          <ConfirmDialog />
          <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route
                  exact
                  path="/login"
                  element={<pages.Login showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/signup"
                  element={<pages.Signup showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/add-note"
                  element={<pages.AddNote showAlert={showAlert} />}
                />
                <Route exact path="/note/:id" element={<pages.NoteDetail />} />
                <Route
                  exact
                  path="/edit-note/:id"
                  element={<pages.EditNote showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/"
                  element={<pages.Home showAlert={showAlert} />}
                />
              </Routes>
            </div>
          </Router>
        </ConfirmationState>
      </UserState>
    </>
  );
}

export default App;
