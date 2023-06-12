import { MenuGroup, Text } from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';

export default function UserInfo() {
  const { characterInfo, isLoading } = useCharacter();

  return (
    <>
      {!isLoading && characterInfo.charName && (
        <MenuGroup
          title="Current Character:"
          fontFamily={'Kalam-Bold'}
          fontSize={{ base: 'sm', lg: 'md' }}
          marginBottom={'0'}
        >
          <Text fontFamily={'Kalam-Light'} paddingLeft={'4'} fontSize={{ base: 'sm', lg: 'md' }}>
            {characterInfo.charName.length > 20
              ? characterInfo.charName.slice(0, 20) + '...'
              : characterInfo.charName}
          </Text>
          <Text fontFamily={'Kalam-Light'} paddingLeft={'4'} fontSize={{ base: 'sm', lg: 'md' }}>
            Level {characterInfo.charLvl} {characterInfo.charClass}
          </Text>
          <Text fontFamily={'Kalam-Light'} paddingLeft={'4'} fontSize={{ base: 'sm', lg: 'md' }}>
            Save DC: {characterInfo.saveDC}
          </Text>
          <Text fontFamily={'Kalam-Light'} paddingLeft={'4'} fontSize={{ base: 'sm', lg: 'md' }}>
            Attack Bonus: {characterInfo.attackBonus}
          </Text>
        </MenuGroup>
      )}
    </>
  );
}
