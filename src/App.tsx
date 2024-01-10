import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavbarComponent } from './components';
import { Login, Main, New, Users } from './pages';
import { GlobalContext } from './contexts/GlobalContext';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  const [appState, setAppState] = useState({
    logged: false,
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAppState({ ...JSON.parse(user) });
    }
  }, []);
  return (
    <GlobalContext.Provider value={{ appState, setAppState }}>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/new' element={<New />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute isPublic>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/users'
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}
export default App;
