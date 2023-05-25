import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';

export default function MobileNav() {
  const { characterInfo } = useCharacter();
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Stack hideFrom={'751px'}>
      <Menu isOpen={isOpen} onClose={onClose} onToggle={onToggle}>
        <MenuButton aria-label={'Open Menu'} onClick={onToggle}>
          <HamburgerIcon />
        </MenuButton>
        <MenuList alignContent={'center'}>
          <MenuGroup title="Spell Pages">
            <MenuItem value="prepared">
              <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
                Prepared
              </NavLink>
            </MenuItem>
            <MenuItem value="known">
              <NavLink to="known-spells" alt="known" title="Known Spells">
                Known
              </NavLink>
            </MenuItem>
            {characterInfo.charClass === 'Cleric' ||
            characterInfo.charClass === 'Druid' ||
            characterInfo.charClass === 'Paladin' ? null : (
              <MenuItem value="available">
                <NavLink to="available-spells" alt="all" title="Available Spells">
                  Available
                </NavLink>
              </MenuItem>
            )}
            <MenuItem value="all">
              <NavLink to="all-spells" alt="all" title="All Spells">
                All
              </NavLink>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Stack>
    // <Stack hideFrom={'751px'}>
    //   <Popover
    //     isOpen={isOpen}
    //     onClose={onClose}
    //     placement="bottom-start"
    //     modifiers={[
    //       { name: 'offset', options: { offset: [0, 8] } },
    //       { name: 'preventOverflow', options: { padding: 8 } },
    //       { name: 'flip', options: { padding: 8 } },
    //     ]}
    //   >
    //     <PopoverTrigger>
    //       <Button
    //         leftIcon={<HamburgerIcon />}
    //         variant="outline"
    //         aria-label="Open Menu"
    //         // display={{ md: 'none' }}
    //         onClick={onToggle}
    //       >
    //         Menu
    //       </Button>
    //     </PopoverTrigger>
    //     <PopoverContent>
    //       <PopoverArrow />
    //       <PopoverBody>
    //         <Stack>
    //           <NavLink to="/prepared-spells" alt="prepared" title="Prepared Spells">
    //             Prepared
    //           </NavLink>
    //           <NavLink to="/known-spells" alt="known" title="Known Spells">
    //             Known
    //           </NavLink>
    //           {characterInfo.charClass === 'Cleric' ||
    //           characterInfo.charClass === 'Druid' ||
    //           characterInfo.charClass === 'Paladin' ? null : (
    //             <NavLink to="/available-spells" alt="available" title="Available Spells">
    //               Available
    //             </NavLink>
    //           )}
    //           <NavLink to="/all-spells" alt="all" title="All Spells">
    //             All
    //           </NavLink>
    //         </Stack>
    //       </PopoverBody>
    //     </PopoverContent>
    //   </Popover>
    // </Stack>
  );
}
