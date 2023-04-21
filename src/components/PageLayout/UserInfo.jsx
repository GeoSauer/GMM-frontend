import { MenuDivider } from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import { useUser } from '../../context/UserContext';

export default function UserInfo() {
  const { userInfo } = useUser();
  const { characterInfo } = useCharacter();
  return (
    <div className="info">
      <p>{userInfo.username}</p>
      <MenuDivider />
      <p>{characterInfo.charName}</p>
      <p>{characterInfo.charClass}</p>
      {characterInfo.charLvl && <p>Level: {characterInfo.charLvl}</p>}
    </div>
  );
}
