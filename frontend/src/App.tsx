import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Leads from './components/leads/Leads'
import AddLead from './components/leads/AddLead'
import ScheduleFollowUp from './components/leads/followups/ScheduleFollowUp'
import LeadFollowUps from './components/leads/followups/LeadFollowUps'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/leads' element={<Leads />} />
          <Route path='/leads/add' element={<AddLead />} />
          <Route path='/lead/schedule' element={<ScheduleFollowUp />} />
          <Route path='/lead/followups' element={<LeadFollowUps />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
