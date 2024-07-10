import * as React from "react";
import { VStack, HStack } from "@/components/stacks";

type gender = "male" | "female";

export class Character {
  name:      string;
  rank:      rank;
  stats:     stat[];
  gender:    gender;
  journeyed: number;

  // constructor with JSON as input
  constructor({ name, gender, rank, stats, journeyed }: {
    name: string; gender: gender; rank: rank; stats: stat[]; journeyed?: number;
  }) {
    this.name      = name;
    this.gender    = gender;
    this.rank      = rank;
    this.stats     = stats;
    this.journeyed = journeyed ?? Date.now();
  }

  get title(): string {
    return this.rank.suffix ? `${this.name} ${this.rank.title}` : `${this.rank.title} ${this.name}`;
  }
}

interface stat {
  xp:        number;
  name:      string;
  talismans: { [ddmmyyyy: string]: talisman };
}

interface talisman {
  level:    number;
  rarity:   string;
  consumed: date;
}

interface date {
  day:   number;
  month: number;
  year:  number;
}

class rank {
  name:   string;
  rarity: rarity;
  title:  string;
  suffix: boolean = false;
  xp:     number  = 0;

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

export class ChronicleMonth {
  month: number; // 1-indexed
  year: number;
  amountOfDays: number;
  startWeekday: number;
  endWeekday: number;

  constructor(month: number, year: number) {
    this.month = month;
    this.year = year;
    this.amountOfDays = new Date(year, month, 0).getDate();
    this.startWeekday = new Date(year, month - 1, 1).getDay();
    this.endWeekday = new Date(year, month, 0).getDay();
  }

  /* Returns the amount rows needed to display the month considering the start weekday */
  get rows(): number {
    return Math.ceil((this.amountOfDays + this.startWeekday) / 7);
  }

  /* Returns the amount of columns needed to display the month considering how many days in its last week */
  get cols(): number {
    return Math.ceil(this.amountOfDays / 7);
  }

  /* Returns whether or not the given day is in the cells of a month chart */
  dayInMonth(week: number, day: number): boolean {
    return (
      week * 7 + day >= this.startWeekday &&
      week * 7 - this.startWeekday + day < this.amountOfDays
    );
  }

  /* Returns the amount of days in the given week */
  daysForWeek(week: number): number {
    return Math.min(7, this.amountOfDays - week * 7);
  }
}

export default function Home() {
  const character = new Character({
    name: "Napoleon",
    gender: "male",
    rank: ranks.knight,
    stats: [
      {
        name: "Strength",
        xp: 100,
        talismans: {
          '02102024': {
            level: 1,
            rarity: rarity.common,
            consumed: { day: 2, month: 10, year: 2024 }
          },
        },
      },
    ],
  });

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

const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

function Stats({ character, angle = 'cols' }: {
  character: Character, angle?: 'cols' | 'rows'
}) {
  var currYearVal = new Date().getFullYear();
  var currMonthVal = new Date().getMonth();

  var months: ChronicleMonth[] = [];
  for (var i = 1; i <= 12; i++) months.push(new ChronicleMonth(i, currYearVal));
  const currMonth = months[currMonthVal];

  return (
    <VStack className="items-center space-y-4 text-2xl text-[#f7a22d] font-gaelic">
      <div>
        <h3>
          {monthNames[currMonthVal]}{" "} of the {currYearVal}<sup>th</sup> Year
        </h3>
      </div>
      <div>
        <VStack className="space-y-2">
          {Array.from({ length: currMonth.rows }).map((_, week) => (
            <HStack className="space-x-4" key={week}>
              {Array.from({ length: 7 }).map((_, day) => (
                currMonth.dayInMonth(week, day)
                  ? <Talisman key={day} character={character} />
                  : <GrayTalisman />
              ))}
            </HStack>
          ))}
        </VStack>
      </div>
    </VStack>
  );
}

function Talisman({ character }: {
  character: Character
}) {
  return (
    <div className="w-8 h-8 border-2 rounded-[2px] border-[#b87f0d]">
      {/*  */}
    </div>
  );
}

function GrayTalisman() {
  return (
    <div className="w-8 h-8 border-2 rounded-[2px]" style={{ borderColor: "#646464" }} />
  );
}

function Talismans({ character, month }: {
  character: Character;
  month: ChronicleMonth;
}) {
  return <></>;
}
