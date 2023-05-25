import { MenuDivider, Text } from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import { useUser } from '../../context/UserContext';

export default function UserInfo() {
  const { userInfo } = useUser();
  const { characterInfo, isLoading } = useCharacter();

  return (
    <>
      {!isLoading && userInfo.username && characterInfo.charName && (
        <>
          <Text>
            {userInfo.username.length > 20
              ? userInfo.username.slice(0, 20) + '...'
              : userInfo.username}
          </Text>
          <MenuDivider />
          <Text>
            {characterInfo.charName.length > 20
              ? characterInfo.charName.slice(0, 20) + '...'
              : characterInfo.charName}
          </Text>
          <Text>{characterInfo.charClass}</Text>
          <Text>Level: {characterInfo.charLvl}</Text>
          <Text>Save DC: {characterInfo.saveDC}</Text>
          <Text>Attack Bonus: {characterInfo.attackBonus}</Text>
        </>
      )}
    </>
  );
}
