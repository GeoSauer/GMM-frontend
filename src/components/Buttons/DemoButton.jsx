import { Button } from '@chakra-ui/react';
import { useUser } from '../../context/UserContext';
import { Character } from '../../services/Character';
import { User } from '../../services/User';
import { useState } from 'react';

export default function DemoButton() {
  const { setUserState, setIsLoading } = useUser();
  const [isDisabled, setIsDisabled] = useState(false);

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);

  const demoUser = {
    email: `demo${Math.floor(Math.random() * 9000) + 100}@test.com`,
    password: '123123123',
    username: 'Demo' + (Math.floor(Math.random() * 9000) + 100),
    demo: true,
    expirationDate: expirationDate,
  };

  const characters = [
    { charName: 'Beau Fiasco', charClass: 'Bard', charLvl: '11', charMod: '4' },
    { charName: 'Abric Dragonslayer', charClass: 'Cleric', charLvl: '8', charMod: '3' },
    { charName: 'Reshk', charClass: 'Druid', charLvl: '13', charMod: '5' },
    { charName: 'Ulrick Lightborne', charClass: 'Paladin', charLvl: '16', charMod: '4' },
    { charName: 'Drayton Scholls', charClass: 'Ranger', charLvl: '6', charMod: '2' },
    { charName: 'Alistair', charClass: 'Sorcerer', charLvl: '17', charMod: '6' },
    { charName: 'Felbane', charClass: 'Warlock', charLvl: '10', charMod: '3' },
    { charName: 'Marius Rune', charClass: 'Wizard', charLvl: '3', charMod: '3' },
  ];

  const handleClick = async () => {
    setIsDisabled(true);
    setIsLoading(true);
    const user = await User.signUp(demoUser);
    await Promise.all(characters.map((character) => Character.create(character)));
    setIsLoading(false);
    setUserState(user.body);
  };

  return (
    <Button
      fontFamily={'Kalam-Bold'}
      fontSize={{ base: 'sm', lg: 'xl' }}
      color={'green.100'}
      textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
      rounded={'full'}
      width={{ base: '', lg: '200px' }}
      _hover={{
        transform: 'translateY(-3px)',
        boxShadow: '4xl',
      }}
      sx={{
        backgroundImage:
          'radial-gradient(circle at 95% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
        boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      }}
      onClick={handleClick}
      isDisabled={isDisabled}
    >
      Demo
    </Button>
  );
}
