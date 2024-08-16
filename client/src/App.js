import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import AccountDashboard from "./components/Dashbaord/AccountDashboard";
import AccountDetails from "./components/Dashbaord/AccountDetails";
import AddTransaction from "./components/Forms/AddTransaction";
import AddAccount from "./components/Forms/AddAccount";

function App() {
  return (
   <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<AccountDashboard/>}/>
      <Route path="/account-details/:accountID" element={<AccountDetails/>}/>
      <Route path="/add-transaction/:id" element={<AddTransaction/>}/>
      <Route path="/dashboard/accounts/create" element={<AddAccount/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
