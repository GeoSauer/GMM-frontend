import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Auth from './components/LandingPage/Auth';
import ProtectedRoute from './components/LandingPage/ProtectedRoutes';
import Layout from './components/PageLayout/Layout';
import AboutPage from './components/AboutPage/AboutPage';
import CharacterPage from './components/CharacterPage/CharacterPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import SpellDisplay from './components/Spells/SpellDisplay';
import AvailableSpellDisplay from './components/Spells/AvailableSpellDisplay';
import KnownSpellDisplay from './components/Spells/KnownSpellDisplay';
import PreparedSpellDisplay from './components/Spells/PreparedSpellDisplay';
//TODO here's some stuff to do...

//TODO harsh realities....
//? adding all of the individual class progression logic is going to be too much for V1
//? Gotta slim it back a bit and rely more on the honor system, ie doing away with availableSpells/Cantrips for the time being
//? to hit MVP I've gotta just have this be an app that doesn't restrict a user any more than a paper character sheet does.

//TODO V1 stuff
//? make a demo button on landing page that logs in a dummy account
//? make a short rest button?
//? consolidate signin credentials to one input
//? consider refactoring a number of pages to slim routes down and create better flow
//? refactor auth.jsx into layout.jsx?
//?add error handling to toasts on spell buttons, and literally everywhere else
//? maybe the mobile width menu should be a drawer instead? Also it's just a mess now
//? consider making some spellDetail (and SpellLevelModal) bits into components
//! save dc and attack bonus display
//* should players even be able to edit class?  Right it borks everything, could make changing class reset spells/cantrips known
//? if a character is edited to a lower level make them forget spells they no longer have access to
//? if a character is edited to go up a level, confetti???
//? Display amount of cantrips/spells available to learn
//* make sure test don't wipe prod db

//TODO V2 stuff
//* add light/dark/themes modes to settings
//* add a wishlist to ALL, favorites to KNOWN
//* add search/filters to ALL
//? On level increase throw a message that reminds them of what they can do/add?
//! bonus spells/scrolls
//! add a bonus_spells column not affected by stats
//! when classes get bonus spells that others don't add some logic to the stat utils
//! reaction spells

//TODO Things that need context/state adjustments
//? on character edit the info updates in UserInfo but not in CharacterCard
//? All of the spell related buttons
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
          <Route path="available-spells" element={<AvailableSpellDisplay />} />
          <Route path="known-spells" element={<KnownSpellDisplay />} />
          <Route path="prepared-spells" element={<PreparedSpellDisplay />} />
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
