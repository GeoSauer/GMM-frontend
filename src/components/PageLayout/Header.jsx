import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import UserInfo from './UserInfo';

export default function Header() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('welcome', { replace: true });
  };

  return (
    <header>
      <div className="infoAndSignOut">
        <UserInfo />
        <button className="signOut" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <h2>Grimoire for the Modern Mage</h2>
    </header>
  );
}
