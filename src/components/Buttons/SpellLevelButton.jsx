import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useCharacter, useSpell } from '../../context/CharacterContext';
import { getSuffix, fullModifier } from '../../utils/utils';

export default function SpellLevelButton({ spell, spellDetails, outOfSpellSlots }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { characterInfo, setCharacterInfo } = useCharacter();
  const [slotLevel, setSlotLevel] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const toast = useToast();
  const { cast } = useSpell();

  const damageAtSlotLevel = spellDetails?.damage.damageAtSlotLevel
    ? Object.keys(spellDetails.damage.damageAtSlotLevel)
    : [];

  useEffect(() => {
    const calculateInitialSlotLevel = () => {
      for (let i = 1; i <= 9; i++) {
        if (spell.level <= i && characterInfo[`level${i}SpellSlots`]) {
          return i;
        }
      }
      return null;
    };
    const initialSlotLevel = calculateInitialSlotLevel();
    setSlotLevel(initialSlotLevel);
  }, [spell.level, characterInfo]);

  const handleCast = async (charId, slotLevel) => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 1500);
    try {
      if (slotLevel) {
        const suffix = getSuffix(slotLevel);
        if (spell.level > 0) {
          await cast(charId, slotLevel);
          const availableSlots = characterInfo[`level${slotLevel}SpellSlots`]--;
          setCharacterInfo({ ...characterInfo, availableSlots });
        }
        onClose();
        toast({
          title: `${spell.name} cast at ${slotLevel}${suffix}-Level!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Please choose a level!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.response.body.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        fontFamily={'Kalam-Bold'}
        fontSize={{ base: 'xl', lg: '2xl' }}
        color={'yellow.100'}
        textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
        rounded={'full'}
        _hover={{
          transform: 'translateY(-3px)',
          boxShadow: '4xl',
        }}
        sx={{
          backgroundImage:
            'radial-gradient(circle at 95% 15%, white 1px, yellow 6%, darkorange 60%, yellow 100%)',
          boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        }}
        onClick={onOpen}
        isDisabled={outOfSpellSlots}
      >
        Cast with a spell slot
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent align={'center'}>
          <ModalHeader
            fontFamily={'Kalam-Bold'}
            fontSize={{ base: 'lg', lg: 'xl' }}
            paddingTop={'6'}
          >
            At what level would you like to cast {spell.name}?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              value={slotLevel}
              fontFamily={'Kalam-Light'}
              onChange={(e) => setSlotLevel(e.target.value)}
            >
              {[...Array(9)].map((_, i) => {
                const number = i + 1;
                const spellsAvailableAtSlotLevel = characterInfo[`level${number}SpellSlots`];

                if (spell.level <= number && spellsAvailableAtSlotLevel) {
                  return (
                    spellsAvailableAtSlotLevel && (
                      <option key={`key-${i}`} value={number}>
                        {number}
                      </option>
                    )
                  );
                }
                return null;
              })}
            </Select>

            <Button
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'xl', lg: '2xl' }}
              color={'yellow.100'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              margin={'2'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 80% 15%, white 1px, yellow 6%, darkorange 60%, yellow 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
              onClick={() => handleCast(characterInfo.id, slotLevel)}
              isDisabled={isDisabled}
            >
              Cast
            </Button>

            {spellDetails?.attackType && (
              <>
                <Heading
                  fontFamily={'Kalam-Bold'}
                  fontSize={{ base: 'sm', lg: 'lg' }}
                  textTransform="uppercase"
                >
                  Attack Type
                </Heading>
                <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                  {spellDetails?.attackType} spell attack, roll 1d20 + {characterInfo.attackBonus}{' '}
                  to hit.
                </Text>
              </>
            )}

            {spellDetails?.damage?.damageType?.name && (
              <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                Deals{' '}
                {damageAtSlotLevel.length === 1 && (
                  <span>{Object.values(spellDetails.damage.damageAtSlotLevel)} </span>
                )}
                {spellDetails?.damage.damageType.name.toLowerCase()} damage.
              </Text>
            )}

            {spellDetails?.higherLevel.length > 1 && (
              <>
                <Heading
                  fontFamily={'Kalam-Bold'}
                  fontSize={{ base: 'sm', lg: 'lg' }}
                  textTransform="uppercase"
                  paddingTop={'2'}
                >
                  Higher Level
                </Heading>
                <Text paddingTop="2" fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                  {spellDetails.higherLevel}
                </Text>
              </>
            )}

            {damageAtSlotLevel.length > 1 && (
              <TableContainer>
                <Table>
                  <TableCaption
                    placement="top"
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                    color={'black'}
                  >
                    Damage At Spell Slot Level
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th fontFamily={'Kalam-Bold'} fontSize={{ base: 'xs', lg: 'md' }}>
                        Level
                      </Th>
                      <Th fontFamily={'Kalam-Bold'} fontSize={{ base: 'xs', lg: 'md' }}>
                        Damage
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(spellDetails.damage.damageAtSlotLevel).map((key, i) => {
                      const value = spellDetails.damage.damageAtSlotLevel[key];
                      return (
                        <Tr key={i}>
                          <Td
                            key={key}
                            fontFamily={'Kalam-Light'}
                            fontSize={{ base: 'xs', lg: 'md' }}
                          >
                            {key}
                          </Td>
                          <Td
                            key={value}
                            fontFamily={'Kalam-Light'}
                            fontSize={{ base: 'xs', lg: 'md' }}
                          >
                            {value}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}

            {spellDetails?.healAtSlotLevel && (
              <TableContainer>
                <Table>
                  <TableCaption
                    placement="top"
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                    color={'black'}
                  >
                    Heal At Spell Slot Level
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th fontFamily={'Kalam-Bold'} fontSize={{ base: 'xs', lg: 'md' }}>
                        Level
                      </Th>
                      <Th fontFamily={'Kalam-Bold'} fontSize={{ base: 'xs', lg: 'md' }}>
                        Max And Current HP Raised By
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(spellDetails.healAtSlotLevel).map((key, index) => {
                      const value = spellDetails.healAtSlotLevel[key];
                      return (
                        <Tr key={index}>
                          <Td
                            key={key}
                            fontFamily={'Kalam-Light'}
                            fontSize={{ base: 'xs', lg: 'md' }}
                          >
                            {key}
                          </Td>
                          <Td
                            key={value}
                            fontFamily={'Kalam-Light'}
                            fontSize={{ base: 'xs', lg: 'md' }}
                          >
                            {value.replace('MOD', characterInfo.charMod)}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}

            {spellDetails?.saveDc.type && (
              <>
                <Heading
                  fontFamily={'Kalam-Bold'}
                  fontSize={{ base: 'sm', lg: 'lg' }}
                  textTransform="uppercase"
                  paddingTop={'4'}
                >
                  Save DC
                </Heading>
                <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                  DC {characterInfo.saveDC} {fullModifier(spellDetails.saveDc.type.name)} saving
                  throw.
                </Text>
                <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                  On success {spellDetails.damage.damageType ? 'damage taken' : 'effect'} is{' '}
                  {spellDetails.saveDc.success}.
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
