import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useCharacter } from '../../context/CharacterContext';
import Subheader from './Subheader';

export default function Layout() {
  const { currentCharacter } = useCharacter();
  if (!currentCharacter) return <Navigate to="choose-character" />;

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
