// import { Navigate, Route, Routes } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './components/AboutPage/AboutPage';
import LandingPage from './components/LandingPage/LandingPage';
import Layout from './components/PageLayout/Layout';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProtectedRoute from './components/LandingPage/ProtectedRoutes';
import SignInForm from './components/LandingPage/SignInForm';
import SignUpForm from './components/LandingPage/SignUpForm';
import SpellList from './components/SpellListPage/SpellList';
import Auth from './components/LandingPage/Auth';
import SpellCompendium from './components/SpellCompendiumPage/SpellCompendium';
import ProfileForm from './components/ProfilePage/ProfileForm';
import SettingsPage from './components/SettingsPage/SettingsPage';

function App() {
  return (
    <Routes>
      <Route path="welcome" element={<LandingPage />}>
        <Route index element={<Auth />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route path="sign-in" element={<SignInForm />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route
            path="spell-list"
            element={<SpellList />}
          />
          <Route
            path="spell-compendium"
            element={<SpellCompendium />}
          />
          <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="edit" element={<ProfileForm />} />
          </Route>

          <Route
            path="settings"
            element={<SettingsPage />}
          />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Route>
      {/* <Route
        path="*"
        element={<Navigate to="spell-list" replace />}
      /> */}
    </Routes>
  );
}

export default App;
