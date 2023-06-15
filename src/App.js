import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import ProtectedRoute from './components/LandingPage/ProtectedRoutes';
import Layout from './components/PageLayout/Layout';
import CharacterPage from './components/CharacterPage/CharacterPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import SpellDisplay from './components/Spells/SpellDisplay';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <Box overflow={'hidden'} width={'100vw'}>
      <ScrollToTop />
      <Routes>
        <Route path="welcome" element={<LandingPage />} />
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
    </Box>
  );
}

export default App;
