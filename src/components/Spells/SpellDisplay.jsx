// import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSpellDetails } from '../../context/SpellContext';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import SpellCard from '../Spells/SpellCard';

export default function SpellDisplay() {
  const {
    allSpells,
    allSpellDetails,
    knownSpells,
    knownSpellDetails,
    preparedSpells,
    preparedSpellDetails,
    loading,
  } = useSpellDetails();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <SpellSlots />
      {loading && <Loading />}
      {/* <Tabs isFitted variant="enclosed"> */}
      {/* <TabList> */}
      {preparedSpells.length > 0 && (
        // <Tab
        // onClick={() => {
        //   navigate('/prepared-spells');
        // }}
        // >
        <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
          Prepared Spells
        </NavLink>

        // {/* Prepared Spells */}
        // </Tab>
      )}
      {knownSpells.length > 0 && (
        // <Tab
        // onClick={() => {
        //   navigate('/known-spells');
        // }}
        // >
        <NavLink to="known-spells" alt="known" title="Known Spells">
          Known Spells
        </NavLink>

        // {/* Known Spells */}
        // </Tab>
      )}
      {allSpells.length > 0 && (
        // <Tab
        // onClick={() => {
        //   navigate('/all-spells');
        // }}
        // >
        <NavLink to="all-spells" alt="all" title="All Spells">
          All Spells
        </NavLink>

        // {/* All Spells */}
        // </Tab>
      )}
      {/* </TabList>
        <TabPanels> */}
      {location.pathname === '/prepared-spells' && !loading && (
        // <TabPanel>
        <Flex direction={'column'} alignItems={'center'}>
          {preparedSpells.map((spell, index) => (
            <SpellCard key={spell.id} spellDetails={preparedSpellDetails[index]} {...spell} />
          ))}
        </Flex>
        // </TabPanel>
      )}
      {location.pathname === '/known-spells' && !loading && (
        // <TabPanel>
        <Flex direction={'column'} alignItems={'center'}>
          {knownSpells.map((spell, index) => {
            return <SpellCard key={spell.id} spellDetails={knownSpellDetails[index]} {...spell} />;
          })}
        </Flex>
        // </TabPanel>
      )}
      {location.pathname === '/all-spells' && !loading && (
        // <TabPanel>
        <Flex direction={'column'} alignItems={'center'}>
          {allSpells.map((spell, index) => (
            <SpellCard key={spell.id} spellDetails={allSpellDetails[index]} {...spell} />
          ))}
        </Flex>
        // {/* </TabPanel> */}
      )}
      {/* </TabPanels>
      </Tabs> */}
    </>
  );
}
