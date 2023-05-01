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
//? make a short rest button?
//? consolidate signin credentials to one input
//? consider refactoring a number of pages to slim routes down and create better flow
//? refactor auth.jsx into layout.jsx?
//?add error handling to toasts on spell buttons, and literally everywhere else

//? maybe the mobile width menu should be a drawer instead? Also it's just a mess now
//? consider making some spellDetail (and SpellLevelModal) bits into components
//* add light/dark/themes modes to settings
//* add a wishlist to ALL, favorites to KNOWN
//* add search/filters to ALL
//? if a character is edited to a lower level make them forget spells they no longer have access to
//? if a character is edited to go up a level, confetti???
//! save dc and attack bonus display
//* make sure test don't wipe prod db
//! bonus spells/scrolls
//! add a bonus_spells column not affected by stats
//! add more confirmation on learn, learn from level progression, learn from scroll, etc.
//! when classes get bonus spells that others don't add some logic to the stat utils
//! reaction spells
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
