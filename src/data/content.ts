/**
 * Single source of truth for all content in the Apple TV+ "SILO" interactive experience.
 * Showcase experiment created for Portfolio Labs.
 */

export interface IntroContent {
  headline: string;
  valueStatement: string;
  badge: string;
  subtitle: string;
  timeline: Array<{
    period: string;
    company: string;
    role: string;
  }>;
}

export interface WorkProject {
  title: string;
  href: string;
}

export interface WorkItem {
  period: string;
  company: string;
  role: string;
  outcome: string;
  projects: WorkProject[];
}

export interface Level01Content {
  id: 'L1';
  n: 1;
  numberLabel: '01';
  eyebrow: 'LEVEL 01 // THE UP TOP';
  label: 'The Viewscreen';
  title: string;
  items: WorkItem[];
}

export interface ProcessPillar {
  title: string;
  description: string;
}

export interface LiveTool {
  title: string;
  href: string;
  description?: string;
}

export interface Level48Content {
  id: 'L48';
  n: 48;
  numberLabel: '48';
  eyebrow: 'LEVEL 48 // MID-LEVELS';
  label: 'IT & Judicial';
  title: string;
  intro: string;
  pillars: ProcessPillar[];
  liveTools: LiveTool[];
}

export interface FieldNote {
  location: string;
  region: string;
  note: string;
}

export interface Level96Content {
  id: 'L96';
  n: 96;
  numberLabel: '96';
  eyebrow: 'LEVEL 96 // THE GREEN TIERS';
  label: 'Hydroponics & Farms';
  title: string;
  fieldNotes: FieldNote[];
}

export interface SocialLink {
  platform: 'Apple TV+' | 'Trailer' | 'Book' | 'IMDb' | 'Email' | 'LinkedIn' | 'GitHub' | 'Behance' | 'Substack';
  label: string;
  href: string;
}

export interface Level144Content {
  id: 'L144';
  n: 144;
  numberLabel: '144';
  eyebrow: 'LEVEL 144 // THE DOWN DEEP';
  label: 'Mechanical & The Generator';
  title: string;
  intro: string;
  excerpt: string;
  essayLink: {
    label: string;
    href: string;
    isExternal: boolean;
  };
  contact: {
    email: string;
    socials: SocialLink[];
  };
}

export type AnyLevelContent =
  | Level01Content
  | Level48Content
  | Level96Content
  | Level144Content;

export interface SpiralContent {
  intro: IntroContent;
  levels: {
    L1: Level01Content;
    L48: Level48Content;
    L96: Level96Content;
    L144: Level144Content;
  };
  levelsList: AnyLevelContent[];
  contact: {
    email: string;
    socials: SocialLink[];
  };
}

export const CONTENT: SpiralContent = {
  // Mode A Intro: Apple TV+ SILO Promotional Landing Dossier
  intro: {
    badge: "APPLE ORIGINAL SERIES",
    subtitle: "STREAMING ON APPLE TV+",
    headline: "144 Floors Underground. One Deadly Rule.",
    valueStatement:
      "In a ruined and toxic future, ten thousand people survive inside a colossal subterranean silo reaching 144 levels deep into the earth. Bound by the strict laws of The Pact, they believe the silo protects them—until their sheriff breaks the cardinal rule: never ask to go outside.",
    timeline: [
      {
        period: "NOW STREAMING",
        company: "APPLE TV+ ORIGINAL",
        role: "Created by Graham Yost · Starring Rebecca Ferguson, Common & Tim Robbins",
      },
      {
        period: "ARTICLE 144",
        company: "THE PACT",
        role: "Anyone who expresses a desire to go outside must clean the exterior sensors",
      },
      {
        period: "140 YEARS AGO",
        company: "THE REBELLION",
        role: "All records before the uprising were erased. Possession of relics is forbidden",
      },
    ],
  },

  levels: {
    // Level 01: The Up Top (Sheriff, Mayor & The Viewscreen)
    L1: {
      id: "L1",
      n: 1,
      numberLabel: "01",
      eyebrow: "LEVEL 01 // THE UP TOP",
      label: "The Viewscreen",
      title: "The Sheriff, Mayor & The Toxic Beyond",
      items: [
        {
          period: "Level 01",
          company: "The Cafeteria Viewscreen",
          role: "The Only Window to the Outside",
          outcome:
            "A giant screen in the top cafeteria displays a gray, lifeless wasteland. Those sent out to clean wipe the camera sensors with wool pads before suffocating within minutes.",
          projects: [
            {
              title: "Episode 1: Freedom Day",
              href: "https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice",
            },
            {
              title: "Episode 2: Holston’s Pick",
              href: "https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice",
            },
          ],
        },
        {
          period: "The Pact",
          company: "The Airlock & Cleaning",
          role: "The Silo’s Capital Punishment",
          outcome:
            "To say 'I want to go outside' is an irreversible death sentence. The condemned suit up in the airlock and climb out into the lethal atmosphere. None have ever survived.",
          projects: [
            {
              title: "The Ritual of Cleaning",
              href: "https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice",
            },
          ],
        },
        {
          period: "Year Unknown",
          company: "Sheriff Holston & Allison",
          role: "The Spark of Doubt",
          outcome:
            "When Allison uncovers an encrypted hard drive suggesting the viewscreen image is a fabricated hologram, her desperate choice to go outside ignites a quiet revolution.",
          projects: [
            {
              title: "Allison’s Forbidden Discovery",
              href: "https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice",
            },
          ],
        },
      ],
    },

    // Level 48: Mid-Levels (IT & Judicial Surveillance)
    L48: {
      id: "L48",
      n: 48,
      numberLabel: "48",
      eyebrow: "LEVEL 48 // MID-LEVELS",
      label: "IT & Judicial",
      title: "The Server Vaults & Janitorial Eyes",
      intro:
        "The administrative citadel of the Silo. Behind the quiet hum of server banks and the strict dogma of Judicial lies an invisible apparatus of total surveillance.",
      pillars: [
        {
          title: "Bernard Holland & IT Core",
          description:
            "Custodians of the mainframe and the sacred Order of the Founders. Bernard holds the master keys to the communications grid and the truth of who built the Silo.",
        },
        {
          title: "Robert Sims & Judicial Security",
          description:
            "The ruthless enforcers of The Pact. Behind the mundane front of Janitorial operates a covert bunker watching all 144 levels through hidden one-way mirrors.",
        },
        {
          title: "Forbidden Relics & Contraband",
          description:
            "Any artifact surviving from before the Rebellion—hard drives, star maps, magnifying loupes, Georgia travel guides—is branded contraband punishable by exile.",
        },
      ],
      liveTools: [
        {
          title: "Relic Archive: The 18-Minute Star Video",
          href: "https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice",
        },
        {
          title: "Judicial Surveillance: The Mirror Network",
          href: "https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice",
        },
      ],
    },

    // Level 96: The Green Tiers (Hydroponics & Farms)
    L96: {
      id: "L96",
      n: 96,
      numberLabel: "96",
      eyebrow: "LEVEL 96 // THE GREEN TIERS",
      label: "Hydroponics & Farms",
      title: "Life Support & The Living Spectrum",
      fieldNotes: [
        {
          location: "Vertical Hydroponics",
          region: "Life Support",
          note: "Towering nutrient mist vats and vertical greens feeding ten thousand residents. Every drop of water is reclaimed from moisture traps and subterranean runoff.",
        },
        {
          location: "The Orchard Rings",
          region: "Artificial Spectrum",
          note: "Engineered fruit trees thriving under giant sodium-arc lamps. Without natural sunlight or seasons, the Silo lives by artificial 16-hour light cycles.",
        },
        {
          location: "Lukas Kyle & The Stars",
          region: "The Night Shift",
          note: "During off-shift hours in the Level 96 cafeteria, Lukas spends his nights mapping mysterious points of light that rotate across the dark sky on the viewscreen.",
        },
        {
          location: "The Soil Reactors",
          region: "Zero Waste",
          note: "Every scrap of agricultural biomass and organic waste is patiently composted in the reclamation tanks. In a sealed world, nothing is ever thrown away.",
        },
      ],
    },

    // Level 144: The Down Deep (Mechanical & The Generator)
    L144: {
      id: "L144",
      n: 144,
      numberLabel: "144",
      eyebrow: "LEVEL 144 // THE DOWN DEEP",
      label: "Mechanical & The Generator",
      title: "The Great Generator & The Flooded Machine",
      intro:
        "One mile down, where heat radiates through concrete and grease is etched into every palm. Here, Juliette Nichols and the Mechanical crew keep the Silo’s iron heart beating.",
      excerpt:
        "The Generator has run continuously for over two hundred years. If it stops, the air scrubbers fail, the water pumps seize, and ten thousand people perish in the dark.",
      essayLink: {
        label: "Stream SILO Season 1 & 2 on Apple TV+",
        href: "https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice",
        isExternal: true,
      },
      contact: {
        email: "apple-tv-silo@apple.com",
        socials: [
          {
            platform: "Apple TV+",
            label: "Watch on Apple TV+",
            href: "https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice",
          },
          {
            platform: "Trailer",
            label: "Official Trailer",
            href: "https://www.youtube.com/watch?v=8ZYhuvIv1pA",
          },
          {
            platform: "Book",
            label: "Hugh Howey’s Wool Trilogy",
            href: "https://hughhowey.com/books/wool/",
          },
          {
            platform: "IMDb",
            label: "SILO on IMDb (8.1/10)",
            href: "https://www.imdb.com/title/tt14688458/",
          },
        ],
      },
    },
  },

  // Contact / Streaming info reused in outro
  contact: {
    email: "apple-tv-silo@apple.com",
    socials: [
      {
        platform: "Apple TV+",
        label: "Watch on Apple TV+",
        href: "https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice",
      },
      {
        platform: "Trailer",
        label: "Official Trailer",
        href: "https://www.youtube.com/watch?v=8ZYhuvIv1pA",
      },
      {
        platform: "Book",
        label: "Hugh Howey’s Wool Trilogy",
        href: "https://hughhowey.com/books/wool/",
      },
      {
        platform: "IMDb",
        label: "SILO on IMDb (8.1/10)",
        href: "https://www.imdb.com/title/tt14688458/",
      },
    ],
  },

  get levelsList() {
    return [this.levels.L1, this.levels.L48, this.levels.L96, this.levels.L144];
  },
};

export default CONTENT;
