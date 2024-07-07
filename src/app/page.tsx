import * as React from "react";

interface character {
  name:      string;
  title:     rank;
  stats:     stat[];
  journeyed: Date;
}

interface stat {
  xp:        number;
  name:      string;
  talismans: talisman[];
}

interface talisman {
  level:    number;
  rarity:   string;
  consumed: Date;
}

interface rank {
  name:    string;
  color:   string;
  title?:  string;
  xp:      number;
  suffix?: boolean
}

enum color {
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

const ranks: rank[] = [
  {
    name: "Peasant",
    title: "Peasant",
    color: color.poor,
    xp: 0,
  },
  {
    name: "Squire",
    title: "Squire",
    color: color.uncommon,
    xp: 100,
  },
  {
    name: "Knight",
    title: "Ser",
    color: color.rare,
    xp: 5000,
  },
  {
    name: "Lord",
    title: "Lord",
    color: color.epic,
    xp: 100000,
  },
  {
    name: "Royal",
    title: "Regent",
    color: color.legendary,
    xp: 1000000,
  },
  {
    name: "Mythical",
    title: "Mythic",
    color: color.unique,
    xp: 5000000
  },
  {
    name: "Conqueror",
    title: "the Conqueror",
    color: color.mythic,
    xp: 10000000,
    suffix: true
  }
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-12 p-24 bg-black text-white">
      <div className="flex w-full space-x-5">
        <h1 className="text-6xl font-gothic">Chronicle</h1>
      </div>
      <div className="flex flex-row space-x-4 w-full justify-center">
        {ranks.map((rank, id) => (
          <p
            key={id}
            className="text-3xl font-gaelic"
            style={{ color: rank.color }}
          >
            {rank.name}
          </p>
        ))}
      </div>
    </main>
  );
}
