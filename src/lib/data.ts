const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

type gender = "male" | "female";

class Character {
  name:      string;
  rank:      rank;
  stats:     stat[];
  gender:    gender;
  journeyed: number;
  version:   number = 1;

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

  setTalisman(stat: string, date: string, talisman: talisman) {
    const targetStat = this.stats.find(s => s.name === stat);
    if (targetStat) targetStat.talismans[date] = talisman;
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

class date {
  day:   number;
  month: number;
  year:  number;

  constructor({ day, month, year }: { day: number; month: number; year: number }) {
    this.day   = day;
    this.month = month;
    this.year  = year;
  }

  toString() {
    return `${this.day.toString().padStart(2, "0")}${this.month.toString().padStart(2, "0")}${this.year}`;
  }

  /* Returns DDMMYYYY */
  static string(day: number, month: number, year: number) {
    return `${day.toString().padStart(2, "0")}${month.toString().padStart(2, "0")}${year}`;
  }
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

class ChronicleMonth {
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

  /* Returns the date object for the given week and day */
  dateInMonth(week: number, day: number): date {
    const dayInMonth = week * 7 - this.startWeekday + day;
    return new date({ day: dayInMonth + 1, month: this.month, year: this.year });
  }

  /* Returns the amount of days in the given week */
  daysForWeek(week: number): number {
    return Math.min(7, this.amountOfDays - week * 7);
  }
}

export {
  monthNames,
  Character,
  rank,
  rarity,
  ranks,
  ChronicleMonth,
  date,
  type stat,
  type talisman,
}