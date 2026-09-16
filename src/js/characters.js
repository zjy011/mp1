/**
 * Content for the Nightfarer modal, keyed by the `data-character` value on each
 * card. Kept apart from modal.js so the dialog stays purely presentational.
 */

const characters = {
  wylder: {
    name: 'Wylder',
    role: 'Balanced melee',
    archetype: 'All-rounder',
    availability: 'Base game',
    image: 'assets/heros/wylder.jpeg',
    blurb:
      'Reliable all-rounder; greatsword plus a grappling hook for closing distance.',
  },
  guardian: {
    name: 'Guardian',
    role: 'Tank',
    archetype: 'Protector',
    availability: 'Base game',
    image: 'assets/heros/guardian.jpeg',
    blurb:
      'Winged sentinel with halberd and shield; can shelter allies from damage.',
  },
  ironeye: {
    name: 'Ironeye',
    role: 'Ranged',
    archetype: 'Marksman',
    availability: 'Base game',
    image: 'assets/heros/ironeye.jpeg',
    blurb:
      'Archer who exposes enemy weak points and scouts the map for the team.',
  },
  duchess: {
    name: 'Duchess',
    role: 'Agile',
    archetype: 'Duelist',
    availability: 'Base game',
    image: 'assets/heros/duchess.jpeg',
    blurb:
      'Swift dual-dagger duelist who can repeat damage already dealt and vanish.',
  },
  raider: {
    name: 'Raider',
    role: 'Bruiser',
    archetype: 'Frontline',
    availability: 'Base game',
    image: 'assets/heros/raider.jpeg',
    blurb:
      'Massive frontline fighter with the highest health and heavy two-handed weapons.',
  },
  recluse: {
    name: 'Recluse',
    role: 'Sorcerer',
    archetype: 'Caster',
    availability: 'Base game',
    image: 'assets/heros/recluse.jpeg',
    blurb:
      'Sorceress who weaves elemental residue from combat into devastating spells.',
  },
  executor: {
    name: 'Executor',
    role: 'Duelist',
    archetype: 'Counter-attacker',
    availability: 'Base game',
    image: 'assets/heros/executor.jpeg',
    blurb:
      'Katana wielder built around parries and counters, unleashing a beastly aspect.',
  },
  revenant: {
    name: 'Revenant',
    role: 'Summoner',
    archetype: 'Support',
    availability: 'Base game',
    image: 'assets/heros/revenant.jpeg',
    blurb:
      'Calls forth family spirits and can pull fallen allies back to their feet.',
  },
  scholar: {
    name: 'Scholar',
    role: 'Support',
    archetype: 'Support',
    availability: 'Forsaken Hollows DLC',
    image: 'assets/heros/scholar.jpeg',
    blurb:
      'Arcane academic who scans enemies for openings and empowers the party with items.',
  },
  undertaker: {
    name: 'Undertaker',
    role: 'Strength / Faith',
    archetype: 'Strength / Faith',
    availability: 'Forsaken Hollows DLC',
    image: 'assets/heros/undertaker.jpeg',
    blurb:
      'Abbess mandated to slay the Nightlord; can unleash her ultimate art repeatedly.',
  },
};

export default characters;
