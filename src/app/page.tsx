import * as React from "react";

class Character {
  name:      string;
  rank:      rank;
  stats:     stat[];
  journeyed: number;

  constructor(name: string, rank: rank, stats: stat[] = [], journeyed: number = Date.now()) {
    this.name      = name;
    this.rank      = rank;
    this.stats     = stats;
    this.journeyed = journeyed;
  }

  get title(): string {
    return this.rank.suffix ? `${this.name} ${this.rank.title}` : `${this.rank.title} ${this.name}`;
  }
}

interface stat {
  xp:        number;
  name:      string;
  talismans: talisman[];
}

interface talisman {
  level:    number;
  rarity:   string;
  consumed: number;
}

class rank {
  name:   string;
  rarity: rarity;
  title:  string;
  suffix: boolean = false;
  xp:     number = 0;

  constructor(name: string, title: string, rarity: rarity, opts: { xp: number, suffix?: boolean }) {
    this.name   = name;
    this.title  = title;
    this.rarity = rarity;
    this.xp     = opts.xp;
    this.suffix = opts.suffix ?? false;
  }
}

enum rarity {
  junk      = "#323232",
  poor      = "#646464",
  normal    = "#989084",
  common    = "#dedede",
  uncommon  = "#62be0b",
  rare      = "#4a9bd1",
  epic      = "#ad5aff",
  legendary = "#f7a22d",
  unique    = "#e3d88c",
  mythic    = "#e54141",
  hightower = "#1b4a0f",
}

const ranks = {
  peasant:   new rank("Peasant", "Peasant", rarity.poor, { xp: 0 }),
  squire:    new rank("Squire", "Squire", rarity.uncommon, { xp: 100 }),
  knight:    new rank("Knight", "Ser", rarity.rare, { xp: 5000 }),
  lord:      new rank("Lord", "Lord", rarity.epic, { xp: 100000 }),
  royal:     new rank("Royal", "Regent", rarity.legendary, { xp: 1000000 }),
  mythical:  new rank("Mythical", "Mythic", rarity.unique, { xp: 5000000 }),
  conqueror: new rank("Conqueror", "the Conqueror", rarity.mythic, { xp: 10000000, suffix: true }),
};

export default function Home() {
  const character = new Character("Napoleon", ranks.lord, []);
  
  return (
    <main
      className={`
        flex min-h-screen flex-col space-y-12 p-24
        bg-black text-white selection:text-red-800
      `}
    >
      <div className="w-fit">
        <h1 className="text-6xl font-gothic">Chronicle</h1>
        <h2 className="text-1xl font-gaelic pl-3">of {character.title}</h2>
      </div>
      <div className="flex flex-row space-x-4 w-full justify-center">
        {Object.values(ranks).map((rank, id) => (
          <p
            key={id}
            className="text-3xl font-gaelic"
            style={{ color: rank.rarity }}
          >
            {rank.name}
          </p>
        ))}
      </div>
    </main>
  );
}
