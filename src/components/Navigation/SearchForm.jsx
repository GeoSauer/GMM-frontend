import { Box, Button, Flex, Grid, GridItem, Input, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { getSuffix } from '../../utils/utils';

export default function SearchForm({ spellArray, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const classes = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];

  const handleLevelClick = (level) => {
    setSelectedLevels((prevSelectedLevels) => {
      if (prevSelectedLevels.includes(level)) {
        return prevSelectedLevels.filter((selectedLevel) => selectedLevel !== level);
      } else {
        return [...prevSelectedLevels, level];
      }
    });
  };
  const handleClassClick = (selectedClass) => {
    setSelectedClasses((prevSelectedClasses) => {
      if (prevSelectedClasses.includes(selectedClass)) {
        return prevSelectedClasses.filter((selectedCls) => selectedCls !== selectedClass);
      } else {
        return [...prevSelectedClasses, selectedClass];
      }
    });
  };

  const memoizedOnFilter = useCallback(
    (filteredSpells) => {
      onFilter(filteredSpells);
    },
    [onFilter]
  );

  useEffect(() => {
    const filteredSpells = spellArray.filter((spell) => {
      // Filter by name
      const isNameMatch = spell.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by level
      const isLevelMatch = selectedLevels.length === 0 || selectedLevels.includes(spell.level);

      // Filter by class
      const isClassMatch =
        selectedClasses.length === 0 || spell.classes.some((cls) => selectedClasses.includes(cls));

      return isNameMatch && isLevelMatch && isClassMatch;
    });

    memoizedOnFilter(filteredSpells);
  }, [
    spellArray.map((spell) => spell.id).join(','),
    searchTerm,
    selectedLevels,
    selectedClasses,
    memoizedOnFilter,
    spellArray,
  ]);

  return (
    <Box>
      <Flex mb={4}>
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" mb={4} gap={'2'}>
        <GridItem as={Text} colSpan={3}>
          Level:
        </GridItem>
        {[...Array(10)].map((_, index) => {
          const suffix = getSuffix(index);
          return (
            <GridItem
              as={Button}
              key={index}
              colorScheme={selectedLevels.includes(index) ? 'blue' : 'gray'}
              onClick={() => handleLevelClick(index)}
            >
              {index}
              {index > 0 ? suffix : null}
            </GridItem>
          );
        })}
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={'2'}>
        <GridItem as={Text} colSpan={2}>
          Class:
        </GridItem>
        {classes.map((selectedClass) => (
          <GridItem
            as={Button}
            key={selectedClass}
            colorScheme={selectedClasses.includes(selectedClass) ? 'blue' : 'gray'}
            onClick={() => handleClassClick(selectedClass)}
          >
            {selectedClass}
          </GridItem>
        ))}
      </Grid>
      {/* <Box>
        {filteredSpells.map((spell) => (
          <Box key={spell.id} p={2} borderWidth="1px" borderRadius="md">
            <Text>{spell.name}</Text>
            <Text>Level: {spell.level}</Text>
            <Text>Classes: {spell.classes.join(', ')}</Text>
          </Box>
        ))}
      </Box> */}
    </Box>
  );
}
