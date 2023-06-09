import {
  Box,
  Heading,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useRef } from 'react';

function HelpTopic({ title, desc, ...rest }) {
  return (
    <Box padding={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontFamily={'Kalam-Bold'} fontSize="xl">
        {title}
      </Heading>
      <Text fontFamily={'Kalam-Light'} marginTop={4}>
        {desc}
      </Text>
    </Box>
  );
}

export default function HelpButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  return (
    <>
      <MenuItem fontFamily={'Kalam-Regular'} fontSize={'lg'} onClick={onOpen}>
        Help
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody padding={10}>
            <VStack spacing={4}>
              <HelpTopic
                title="Prepared Spells"
                desc="Prepared Spells holds every spell that a character currently has prepared. Here
                spells can be cast (as a ritual or by consuming a spell slot) or unprepared."
              />
              <HelpTopic
                title="Known Spells"
                desc="Known Spells holds every spell that a character currently knows, if your character
                is a Divine Caster (Cleric, Druid, Paladin) their entire available spell list is
                shown. Here spells can also be prepared or forgotten."
              />
              <HelpTopic
                title="Available Spells"
                desc="Available Spells is a page for non-Divine Caster classes (everybody except Clerics,
                Druids, and Paladins) that holds every spell available for them to learn based on
                their class and character level."
              />
              <HelpTopic
                title="Cantrips"
                desc="Cantrips is a special page exclusive to Clerics and Druids that holds all of the
                Cantrips available for them to learn throughout their adventures."
              />
              <HelpTopic
                title="All Spells"
                desc="All Spells is a complete reference of every spell in the game. It also allows
                characters to learn spells from outside of their class if the need arises."
              />
              <HelpTopic
                title="Long Rest Button"
                desc="The Long Rest Button mimics the in-game mechanic and will refill any expended spell
                slots."
              />
              <HelpTopic
                title="Spell Slots Available Per Level"
                desc="Spell Slots Available Per Level displays how many spell slots and of which level a
                character currently has. These tick down as spells are cast and are refilled with
                the Long Rest Button."
              />
              <HelpTopic
                title="Characters"
                desc="Characters allows you to change your selected character or add, edit, or delete
                characters."
              />
              <HelpTopic
                title="Settings"
                desc="Settings allows you edit aspects of your user profile, such as your username."
              />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
