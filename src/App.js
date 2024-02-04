import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/layouts/Footer';
import Login from './components/pages/login/Login';
import { SnackbarProvider } from 'notistack';
import { UserProvider } from './context/UserContext';
import Register from './components/pages/register/Register';
import Profile from './components/pages/user/Profile';
import Layout from './components/layouts/Layout';
import FeedP from './components/pages/feed/FeedP';
import News from './components/pages/news/News';
import Forum from './components/pages/forum/Forum';
import ProjectDetails from './components/pages/project/ProjectDetails';
import MyProject from './components/pages/project/MyProject';
import UserDetails from './components/pages/user/UserDetails';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Router>
          <UserProvider>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<Layout />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/feed' element={<FeedP />} />
                <Route path='/forum' element={<Forum />} />
                <Route path='/news' element={<News />} />
                <Route path='/myprojects' element={<MyProject />} />
                <Route path='/projectdetails/:id' element={<ProjectDetails />} />
                <Route path='/userdetails/:id' element={<UserDetails />} />
              </Route>
            </Routes>
            <Footer />
          </UserProvider>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
