import { MenuDivider, MenuGroup, Text } from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import { useUser } from '../../context/UserContext';

export default function UserInfo() {
  const { userInfo } = useUser();
  const { characterInfo, isLoading } = useCharacter();

  return (
    <>
      {!isLoading && userInfo.username && characterInfo.charName && (
        <>
          <MenuGroup title="Signed in as:" fontFamily={'Kalam-Bold'} fontSize={'md'}>
            <Text fontFamily={'Kalam-Light'} paddingLeft={'4'}>
              {userInfo.username.length > 20
                ? userInfo.username.slice(0, 20) + '...'
                : userInfo.username}
            </Text>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Current Character:" fontFamily={'Kalam-Bold'} fontSize={'md'}>
            <Text fontFamily={'Kalam-Light'} paddingLeft={'4'}>
              {characterInfo.charName.length > 20
                ? characterInfo.charName.slice(0, 20) + '...'
                : characterInfo.charName}
            </Text>
            <Text fontFamily={'Kalam-Light'} paddingLeft={'4'}>
              {characterInfo.charClass}
            </Text>
            <Text fontFamily={'Kalam-Light'} paddingLeft={'4'}>
              Level: {characterInfo.charLvl}
            </Text>
            <Text fontFamily={'Kalam-Light'} paddingLeft={'4'}>
              Save DC: {characterInfo.saveDC}
            </Text>
            <Text fontFamily={'Kalam-Light'} paddingLeft={'4'}>
              Attack Bonus: {characterInfo.attackBonus}
            </Text>
          </MenuGroup>
        </>
      )}
    </>
  );
}
