import * as React from "react";
import { Stats } from "@/components/client";
import { VStack, HStack } from "@/components/stacks";
import { Character, ChronicleMonth, rarity, ranks } from "@/lib/data";

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
