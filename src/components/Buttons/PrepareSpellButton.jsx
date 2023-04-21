import { Button, useToast } from '@chakra-ui/react';
import { useCharacter, useSpell } from '../../context/CharacterContext';

export default function PrepareSpellButton({ spell }) {
  const toast = useToast();
  const { prepare } = useSpell();
  const { characterInfo } = useCharacter();
  const handlePrepare = async (charId, spellId, prepared) => {
    await prepare({ charId, spellId, prepared });
    toast({
      title: `${spell.name} prepared!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };

  return <Button onClick={() => handlePrepare(characterInfo.id, spell.id, true)}>Prepare</Button>;
}
