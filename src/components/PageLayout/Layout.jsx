import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useCharacter } from '../../context/CharacterContext';
import NewUserHelp from '../Help/NewUserHelp';
import { useUser } from '../../context/UserContext';

export default function Layout() {
  const { currentCharacter } = useCharacter();
  const { userInfo } = useUser();
  if (!currentCharacter) return <Navigate to="choose-character" />;

  return (
    <>
      <Header />
      <NewUserHelp userId={userInfo.id} />
      <Outlet />
      <Footer />
    </>
  );
}
