import { HStack } from '@chakra-ui/react';
import LearnSpellButton from '../Buttons/LearnSpellButton';
import PrepareSpellButton from '../Buttons/PrepareSpellButton';
import ForgetSpellButton from '../Buttons/ForgetSpellButton';
import CastSpellButton from '../Buttons/CastSpellButton';
import CastCantripButton from '../Buttons/CastCantripButton';
import UnprepareSpellButton from '../Buttons/UnprepareSpellButton';
import { useLocation } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';
import DisabledKnownButton from '../Buttons/DisabledKnownButton';
import DisabledLearnButton from '../Buttons/DisabledLearnButton';
import DisabledPreparedButton from '../Buttons/DisabledPreparedButton';

export default function SpellCardButtons({ spellDetails, spell }) {
  const location = useLocation();
  const { divineCaster, characterInfo } = useCharacter();

  return (
    <HStack justify={'center'}>
      {location.pathname === '/all-spells' &&
        !spell.known &&
        spell.level <= characterInfo.casterLvl && <LearnSpellButton spell={spell} />}

      {(location.pathname === '/available-spells' || location.pathname === '/cantrips') &&
        !spell.known && <LearnSpellButton spell={spell} />}

      {location.pathname === '/all-spells' && spell.level > characterInfo.casterLvl && (
        <DisabledLearnButton />
      )}

      {(location.pathname === '/all-spells' ||
        location.pathname === '/available-spells' ||
        location.pathname === '/cantrips') &&
        spell.known && <DisabledKnownButton />}

      {location.pathname === '/known-spells' && !spell.prepared && (
        <PrepareSpellButton spell={spell} />
      )}

      {location.pathname === '/known-spells' && spell.prepared && spell.level > 0 && (
        <DisabledPreparedButton />
      )}

      {location.pathname === '/known-spells' && !divineCaster && (
        <ForgetSpellButton spell={spell} />
      )}

      {location.pathname === '/known-spells' &&
        divineCaster &&
        (spell.fromAll || spell.level === 0) && <ForgetSpellButton spell={spell} />}

      {location.pathname === '/prepared-spells' && spell.level === 0 && (
        <CastCantripButton spell={spell} spellDetails={spellDetails} />
      )}

      {location.pathname === '/prepared-spells' && spell.level > 0 && (
        <CastSpellButton spell={spell} spellDetails={spellDetails} />
      )}

      {location.pathname === '/prepared-spells' && spell.level > 0 && (
        <UnprepareSpellButton spell={spell} />
      )}
    </HStack>
  );
}
