import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

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

export default function HelpContent() {
  return (
    <VStack spacing={2}>
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
        desc="Characters allows you to change your selected character as well as add, edit, or delete
		characters."
      />
      <HelpTopic
        title="Settings"
        desc="Settings allows you to edit aspects of your user profile, such as your username."
      />
      <HelpTopic
        title="Feedback"
        desc="Feedback allows users to send app-related feedback straight to the developer.  I'm trying to make this as accessible, intuitive, and responsive as possible so any and all feedback is greatly appreciated!"
      />
    </VStack>
  );
}
