import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';
import { useRef } from 'react';
import EditCharacterForm from './EditCharacterForm';
import { truncateCharacterName } from '../../utils/utils';
import DeleteCharacterButton from '../Buttons/DeleteCharacterButton';
import BardAvatar from '../../assets/Bard.png';
import ClericAvatar from '../../assets/Cleric.png';
import DruidAvatar from '../../assets/Druid.png';
import PaladinAvatar from '../../assets/Paladin.png';
import RangerAvatar from '../../assets/Ranger.png';
import SorcererAvatar from '../../assets/Sorcerer.png';
import WarlockAvatar from '../../assets/Warlock.png';
import WizardAvatar from '../../assets/Wizard.png';
import BardCard from '../../assets/BardCard.jpeg';
import ClericCard from '../../assets/ClericCard.jpeg';
import DruidCard from '../../assets/DruidCard.jpeg';
import PaladinCard from '../../assets/PaladinCard.jpeg';
import RangerCard from '../../assets/RangerCard.jpeg';
import SorcererCard from '../../assets/SorcererCard.jpeg';
import WarlockCard from '../../assets/WarlockCard.jpeg';
import WizardCard from '../../assets/WizardCard.jpeg';

export default function CharacterCard(character) {
  const { setCharacterState, currentCharacter } = useCharacter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firstField } = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const truncatedCharacterName = truncateCharacterName(character);
  let avatarImage;
  let cardImage;

  switch (character.charClass) {
    case 'Bard':
      avatarImage = BardAvatar;
      cardImage = BardCard;
      break;
    case 'Cleric':
      avatarImage = ClericAvatar;
      cardImage = ClericCard;
      break;
    case 'Druid':
      avatarImage = DruidAvatar;
      cardImage = DruidCard;
      break;
    case 'Paladin':
      avatarImage = PaladinAvatar;
      cardImage = PaladinCard;
      break;
    case 'Ranger':
      avatarImage = RangerAvatar;
      cardImage = RangerCard;
      break;
    case 'Sorcerer':
      avatarImage = SorcererAvatar;
      cardImage = SorcererCard;
      break;
    case 'Warlock':
      avatarImage = WarlockAvatar;
      cardImage = WarlockCard;
      break;
    case 'Wizard':
      avatarImage = WizardAvatar;
      cardImage = WizardCard;
      break;
  }

  const handleCharacterChange = () => {
    setCharacterState(character.id);
    if (location.pathname === '/choose-character') navigate('/prepared-spells');
  };

  return (
    <Box
      maxW={'270px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
    >
      <Image
        h={'120px'}
        w={'full'}
        //TODO make this image dynamic, based on charClass
        src={
          cardImage
            ? cardImage
            : 'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        }
        objectFit={'cover'}
      />
      <Flex justify={'center'} mt={-12}>
        <Avatar
          size={'xl'}
          src={avatarImage}
          alt={'Avatar'}
          css={{
            border: '2px solid white',
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
            {truncatedCharacterName}
          </Heading>
          <Text color={'gray.500'}>
            Level {character.charLvl} {character.charClass}
          </Text>
          <Text color={'gray.500'}>Save DC: {character.saveDC}</Text>
          <Text color={'gray.500'}>Attack Bonus: {character.attackBonus}</Text>
        </Stack>

        {character.id !== currentCharacter && (
          <VStack>
            <Button
              w={'fit'}
              mt={8}
              bg={'gray.900'}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={handleCharacterChange}
            >
              {location.pathname === '/characters' ? 'Set Active' : 'Select'}
            </Button>
            {location.pathname === '/characters' && <DeleteCharacterButton character={character} />}
          </VStack>
        )}

        {character.id === currentCharacter ? (
          <VStack>
            <Button
              w={'fit'}
              mt={8}
              bg={'gray.900'}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={onOpen}
            >
              Edit
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
              <ModalOverlay backdropFilter="blur(5px)" />
              <ModalContent>
                <ModalHeader>Editing {truncatedCharacterName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <EditCharacterForm close={onClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </VStack>
        ) : null}
        <Outlet />
      </Box>
    </Box>
  );
}
