import { useCharacter } from '../../context/CharacterContext';
// import { useUserInfo } from '../../context/UserContext';
import { useUser } from '../../context/UserContext';

export default function UserInfo() {
  const { userInfo } = useUser();
  // const { userInfo } = useUserInfo();
  const { characterInfo } = useCharacter();
  return (
    <div className="info">
      <p>{userInfo.username}</p>
      <p>{characterInfo.charName}</p>
      <p>{characterInfo.charClass}</p>
      {characterInfo.charLvl && <p>Level: {characterInfo.charLvl}</p>}
    </div>
  );
}
