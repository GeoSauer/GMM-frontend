import SpellCardBody from './SpellCardBody';
import SpellCardButtons from './SpellCardButtons';

export default function SpellCard({ spellDetails, spell }) {
  return (
    <>
      <SpellCardBody spell={spell} spellDetails={spellDetails} />
      <SpellCardButtons spell={spell} spellDetails={spellDetails} />
    </>
  );
}
