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
