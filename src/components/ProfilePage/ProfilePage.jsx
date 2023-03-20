import { useUserInfo } from '../../context/UserContext';
import { SiDungeonsanddragons } from 'react-icons/si';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();

  return (
    <>
      <div className="userInfo">
        <p>{userInfo.username}</p>
        <p>{userInfo.charName}</p>
        <p>{userInfo.charClass}</p>
        <p>Caster Level: {userInfo.charLvl}</p>
        {userInfo.avatarUrl ? (
          <img
            alt="user avatar"
            href={userInfo.avatarUrl}
          />
        ) : (
          <SiDungeonsanddragons />
        )}
      </div>
      <button
        className="editButton"
        alt="edit profile"
        title="Edit Profile"
        onClick={() => {
          navigate('edit');
        }}
      >
        Edit
      </button>
      <Outlet />
    </>
  );
}
