import { Button, useToast } from '@chakra-ui/react';
import { useCharacter, useSpell } from '../../context/CharacterContext';

export default function ForgetSpellButton({ spell }) {
  const toast = useToast();
  const { forget } = useSpell();
  const { characterInfo } = useCharacter();
  const handleForget = async (charId, spellId) => {
    await forget(charId, spellId);
    toast({
      title: `${spell.name} forgotten!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };

  return <Button onClick={() => handleForget(characterInfo.id, spell.id)}>Forget</Button>;
}
