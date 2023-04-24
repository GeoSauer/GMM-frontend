import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Auth from './components/LandingPage/Auth';
import ProtectedRoute from './components/LandingPage/ProtectedRoutes';
import Layout from './components/PageLayout/Layout';
import AboutPage from './components/AboutPage/AboutPage';
import CharacterPage from './components/CharacterPage/CharacterPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import SpellDisplay from './components/Spells/SpellDisplay';
//TODO here's some stuff to do...
//? make a demo button on landing page that logs in a dummy account
//? make a short/long rest button
//? consolidate signin credentials to one input
//? consider refactoring a number of pages to slim routes down and create better flow
//? refactor auth.jsx into layout.jsx?
//?add error handling to toasts on spell buttons, and literally everywhere else
//? add truncating to long user/character names
// {username.length > 20 ? username.slice(0, 20) + '...' : username}
//?add messages when known/prepared spells === 0
//? add light/dark/themes modes to settings
//? Cantrips are auto prepared, so that's gotta happen
//? sections for spell levels
//? add validation to slotLevel so you can't cast at choose one
//? maybe the mobile width menu should be a drawer instead? Also it's just a mess now
function App() {
  return (
    <Routes>
      <Route path="welcome" element={<LandingPage />}>
        <Route index element={<Auth />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="choose-character" element={<CharacterPage />} />
        <Route element={<Layout />}>
          <Route path="all-spells" element={<SpellDisplay />} />
          <Route path="known-spells" element={<SpellDisplay />} />
          <Route path="prepared-spells" element={<SpellDisplay />} />
          <Route path="characters" element={<CharacterPage />} />
          <Route path="settings">
            <Route index element={<SettingsPage />} />
          </Route>
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate replace to="prepared-spells" />} />
    </Routes>
  );
}

export default App;
