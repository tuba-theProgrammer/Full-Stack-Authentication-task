import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUpScreen';
import { BrowserRouter,  Routes,Route} from 'react-router-dom';
import SignIn from './Components/SignInAccount';
import Dashboard from './Components/Dashboard';
function App() {
  return (
   <>
 <BrowserRouter> 
      <Routes>
          <Route path="/"   element={<SignUp />} />
          <Route path="/login"   element={<SignIn />} />
          <Route path="/deleteAccount"   element={<SignUp />} />
          <Route path="/UpdateAccount"   element={<SignUp />} />
          <Route path="/ViewData"   element={<SignUp />} />
          <Route path="/Dashboard"   element={<Dashboard />} />
          </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
