import { Button, useToast } from '@chakra-ui/react';
import { useCharacter, useSpell } from '../../context/CharacterContext';

export default function UnprepareSpellButton({ spell }) {
  const toast = useToast();
  const { unprepare } = useSpell();
  const { characterInfo } = useCharacter();
  const handleUnprepare = async (charId, spellId, prepared) => {
    await unprepare({ charId, spellId, prepared });
    toast({
      title: `${spell.name} un-prepared!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };

  return (
    <Button onClick={() => handleUnprepare(characterInfo.id, spell.id, false)}>Un-Prepare</Button>
  );
}
