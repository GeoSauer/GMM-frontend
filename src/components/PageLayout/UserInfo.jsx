import { useUser } from '../../context/UserContext';

export default function UserInfo() {
  const { userInfo } = useUser();

  return (
    <div className="userCard">
      <div className="info">
        <p>{userInfo.username}</p>
        <p>{userInfo.charName}</p>
        <p>{userInfo.charClass}</p>
        {userInfo.charLvl && <p>Level: {userInfo.charLvl}</p>}
      </div>
      {/* //TODO sort out avatar stuff */}
      {/* {userInfo.avatarUrl && (
        <img alt="user avatar" src="" />
      )} */}
    </div>
  );
}
