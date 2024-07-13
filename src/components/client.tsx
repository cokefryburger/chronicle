"use client";

import { Character, ChronicleMonth, monthNames, talisman } from "@/lib/data";
import { VStack, HStack } from "@/components/stacks";

function Stats({ character, angle = "cols" }: {
  character: Character;
  angle?: "cols" | "rows";
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
          {monthNames[currMonthVal]} of the {currYearVal}
          <sup>th</sup> Year
        </h3>
      </div>
      <div>
        <VStack className="space-y-2">
          {Array.from({ length: currMonth.rows }).map((_, week) => (
            <HStack className="space-x-4" key={week}>
              {Array.from({ length: 7 }).map((_, day) =>
                currMonth.dayInMonth(week, day) ? (
                  <Talisman key={day} character={character} />
                ) : (
                  <GrayTalisman key={day} />
                )
              )}
            </HStack>
          ))}
        </VStack>
      </div>
    </VStack>
  );
}

function Talisman({ talisman }: {
  talisman?: talisman;
}) {
  return (
    <button>
      <div
        className="w-8 h-8 border-2 rounded-[2px] border-[#b87f0d]"
        style={{ backgroundColor: talisman ? talisman.rarity : "transparent"}}
      />
    </button>
  );
}

function GrayTalisman() {
  return (
    <div className="w-8 h-8 border-2 rounded-[2px]" style={{ borderColor: "#646464" }} />
  );
}

export {
  Stats,
  Talisman,
  GrayTalisman,
}