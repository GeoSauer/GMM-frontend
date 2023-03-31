import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Auth from './components/LandingPage/Auth';
import SignInForm from './components/LandingPage/SignInForm';
import SignUpForm from './components/LandingPage/SignUpForm';
import ProtectedRoute from './components/LandingPage/ProtectedRoutes';
import Layout from './components/PageLayout/Layout';
import AboutPage from './components/AboutPage/AboutPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProfileForm from './components/ProfilePage/ProfileForm';
import SettingsPage from './components/SettingsPage/SettingsPage';
import SpellDisplay from './components/Spells/SpellDisplay';

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
          <Route path="all-spells" element={<SpellDisplay />} />
          <Route path="known-spells" element={<SpellDisplay />} />
          <Route path="prepared-spells" element={<SpellDisplay />} />
          <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="edit" element={<ProfileForm />} />
          </Route>
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate replace to="prepared-spells" />} />
    </Routes>
  );
}

export default App;
