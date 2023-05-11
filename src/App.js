import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Auth from './components/LandingPage/Auth';
import ProtectedRoute from './components/LandingPage/ProtectedRoutes';
import Layout from './components/PageLayout/Layout';
import AboutPage from './components/AboutPage/AboutPage';
import CharacterPage from './components/CharacterPage/CharacterPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import AvailableSpellDisplay from './components/Spells/AvailableSpellDisplay';
import KnownSpellDisplay from './components/Spells/KnownSpellDisplay';
import PreparedSpellDisplay from './components/Spells/PreparedSpellDisplay';
import AllSpellDisplay from './components/Spells/AllSpellDisplay';
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
//* make sure test don't wipe prod db
//* futz with react-rewards for spell animations? Maybe naw
//! OMG spells aren't populating correctly for the current character OR user
//! DeleteCharacterButton not triggering re-render
//! choose-character is sometimes busted but fixes on refresh (something about going or refreshing, I don't remember)
//! ^^^ it's also pushing dupes into allSpells
//! Should AllSpells actually be....ALL??????? (not just up to character level?)

//TODO V2 stuff
//* add light/dark/themes modes to settings
//* add a wishlist to ALL, favorites to KNOWN
//* add search/filters to ALL
//? Display amount of cantrips/spells available to learn
//? On level increase throw a message that reminds them of what they can do/add?
//! bonus spells/scrolls
//! add a bonus_spells column not affected by stats
//! when classes get bonus spells that others don't add some logic to the stat utils
//! reaction spells

//TODO Things that need context/state adjustments
//? on character edit the info updates in UserInfo but not in CharacterCard
function App() {
  return (
    <Routes>
      <Route path="welcome" element={<LandingPage />}>
        <Route index element={<Auth />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="choose-character" element={<CharacterPage />} />
        <Route element={<Layout />}>
          <Route path="all-spells" element={<AllSpellDisplay />} />
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
