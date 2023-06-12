import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import ProtectedRoute from './components/LandingPage/ProtectedRoutes';
import Layout from './components/PageLayout/Layout';
import CharacterPage from './components/CharacterPage/CharacterPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import SpellDisplay from './components/Spells/SpellDisplay';

function App() {
  return (
    <Routes>
      <Route path="welcome" element={<LandingPage />} />1{' '}
      <Route element={<ProtectedRoute />}>
        <Route path="choose-character" element={<CharacterPage />} />
        <Route element={<Layout />}>
          <Route path="all-spells" element={<SpellDisplay />} />
          <Route path="available-spells" element={<SpellDisplay />} />
          <Route path="cantrips" element={<SpellDisplay />} />
          <Route path="known-spells" element={<SpellDisplay />} />
          <Route path="prepared-spells" element={<SpellDisplay />} />
          <Route path="characters" element={<CharacterPage />} />
          <Route path="settings">
            <Route index element={<SettingsPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate replace to="prepared-spells" />} />
    </Routes>
  );
}

export default App;
