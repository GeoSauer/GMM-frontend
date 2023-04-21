import { Button, useToast } from '@chakra-ui/react';
import { useCharacter, useSpell } from '../../context/CharacterContext';

export default function LearnSpellButton({ spell }) {
  const toast = useToast();
  const { learn } = useSpell();
  const { characterInfo } = useCharacter();
  const handleLearn = async (charId, spellId) => {
    await learn(charId, spellId);
    toast({
      title: `${spell.name} learned!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };
  return <Button onClick={() => handleLearn(characterInfo.id, spell.id)}>Learn</Button>;
}
