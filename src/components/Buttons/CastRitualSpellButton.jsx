import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useToast,
  ModalHeader,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import SpellLevelModal from '../Modals/SpellLevelModal';

export default function CastRitualSpellButton({ spell }) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const toast = useToast();
  const handleRitual = () => {
    onClose();
    toast({
      title: `${spell.name} cast as ritual!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={onOpen}>Cast</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>
            How would you like to cast {spell.name}? Remember that casting as a ritual takes 10
            minutes but doesn&apos;t consume a spell slot
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={handleRitual}>As a ritual</Button>
            <SpellLevelModal spell={spell} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* <Popover onClick={onOpen}>
        <PopoverTrigger>
          <Button>Cast</Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>How would you like to cast {spell.name}?</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Button onClick={handleRitual}>As a ritual</Button>
              <SpellLevelModal spell={spell} />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover> */}
    </>
  );
}

// function CastRitualSpellModal({ spell }) {
//   const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
//   const toast = useToast();
//   const handleRitual = () => {
//     onToggle();
//     toast({
//       title: `${spell.name} cast as ritual!`,
//       status: 'success',
//       duration: 1500,
//       isClosable: true,
//     });
//   };

//   return (
//     <>
//       <Button onClick={handleRitual}>As a ritual</Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay backdropFilter="blur(5px)" />
//         <ModalContent>
//           <ModalHeader>How would you like to cast {spell.name}?</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {/* <Button onClick={handleRitual}>As a ritual</Button>
//             <Button onClick={onOpen}>With a spell slot</Button> */}
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
