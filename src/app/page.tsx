import * as React from "react";
import { VStack, HStack } from "@/components/stacks";

type gender = "male" | "female";

class Character {
  name:      string;
  rank:      rank;
  stats:     stat[];
  gender:    gender;
  journeyed: number;

  constructor(name: string, gender: gender, rank: rank, stats: stat[] = [], journeyed: number = Date.now()) {
    this.name      = name;
    this.gender    = gender;
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
  royal:     new rank("Royal", "Grace", rarity.legendary, { xp: 1000000 }),
  mythical:  new rank("Mythical", "Mythic", rarity.unique, { xp: 5000000 }),
  conqueror: new rank("Conqueror", "the Conqueror", rarity.mythic, { xp: 10000000, suffix: true }),
};

export default function Home() {
  const character = new Character("Napoleon", "male", ranks.knight, []);
  return (
    <main
      className={`
        flex min-h-screen flex-col space-y-12 p-24
        bg-black text-white selection:text-red-800
      `}
    >
      <div className="w-fit">
        <h1 className="text-6xl font-gothic">Chronicle</h1>
        <h2 className="text-1xl font-gaelic pl-3" style={{ color: character.rank.rarity }}>of {character.title}</h2>
      </div>
      <div className="flex flex-row space-x-4 w-full justify-center">
        {Object.values(ranks).map((rank, id) => (
          <p
            key={id}
            className="text-2xl font-gaelic"
            style={{ color: rank.rarity }}
          >
            {rank.name}
          </p>
        ))}
      </div>
      <Stats character={character} />
    </main>
  );
}

class ChronicleMonth {
  month:        number;
  year:         number;
  amountOfDays: number;
  startWeekday: number;

  constructor(month: number, year: number) {
    this.month        = month;
    this.year         = year;
    this.amountOfDays = new Date(year, month, 0).getDate();
    this.startWeekday = new Date(year, month - 1, 1).getDay();
  }

  get rows(): number {
    return Math.ceil((this.amountOfDays + this.startWeekday) / 7);
  }

  get cols(): number {
    return Math.ceil(this.amountOfDays / 7);
  }

  daysForWeek(week: number): number {
    return Math.min(7, this.amountOfDays - (week * 7));
  }
}

const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

function Stats({ character }: { character: Character }) {
  var currYearVal = new Date().getFullYear();
  var currMonthVal = new Date().getMonth();

  var months: ChronicleMonth[] = [];
  for (var i = 1; i <= 12; i++)
    months.push(new ChronicleMonth(i, currYearVal));
  const currMonth = months[currMonthVal];

  return (
    <VStack className="items-center space-y-4 text-2xl text-[#f7a22d] font-gaelic">
      {/* <div>
        <h3>
          The {currYearVal}
          <sup>th</sup> Year
        </h3>
      </div> */}
      <div>
        {/* single month cols of 7 days for now */}
        <HStack>
          {Array.from({ length: currMonth.cols }).map((_, id) => (
            <VStack key={id}>
              {Array.from({ length: currMonth.daysForWeek(id) }).map((_, id) => (
                <div key={id} className="w-7 h-7 border-2 border-[#646464] rounded-md" />
              ))}
            </VStack>
          ))}
        </HStack>
      </div>
    </VStack>
  );
}

function Talismans({ character, month }: {
  character: Character;
  month: ChronicleMonth;
}) {
  return <></>;
}
