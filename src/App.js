import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard.tsx';
import PersonRegister from './pages/PersonRegister';
import CompanyRegister from './pages/CompanyRegister';
import PersonEdit from './pages/PersonEdit';
import CompanyEdit from './pages/CompanyEdit';
import Accounts from './pages/Accounts';
import Companies from './pages/Companies';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={LogIn} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/register_user" Component={PersonRegister} />
          <Route path="/register_company" Component={CompanyRegister} />
          <Route path="/edit_user" Component={PersonEdit} />
          <Route path="/edit_company" Component={CompanyEdit} />
          <Route path="/users" Component={Accounts} />
          <Route path="/companies" Component={Companies} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
