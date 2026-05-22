import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './views/LandingPage.jsx'
import FallbackPage from './views/FallbackPage.jsx'
import PrivacyPolicy from './views/PrivacyPolicy.jsx'
import TermsOfUse from './views/TermsOfUse.jsx'
import DeleteAccount from './views/DeleteAccount.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/poll/:id" element={<FallbackPage />} />
        <Route path="/profile/:username" element={<FallbackPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
