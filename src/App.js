
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "./Routes"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    
  )
}
