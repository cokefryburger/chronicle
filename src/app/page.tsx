"use client";

import * as React from "react";
import { VStack, HStack } from "@/components/stacks";
import {
	Character,
	ChronicleMonth,
	monthNames,
	talisman,
	ranks,
	rarity,
	date,
} from "@/lib/data";

const AppContext = React.createContext<any>(null);
const useAppContext = () => React.useContext(AppContext);
function AppContextProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = React.useState<any>({});
	return (
		<AppContext.Provider value={{ state, setState }}>
			{children}
		</AppContext.Provider>
	);
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
					"10022024": {
						level: 1,
						rarity: rarity.common,
						consumed: new date({ day: 10, month: 2, year: 2024 }),
					},
					"26072024": {
						level: 2,
						rarity: rarity.rare,
						consumed: new date({ day: 26, month: 7, year: 2024 }),
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
				<h2
					className="text-1xl font-gaelic pl-3"
					style={{ color: character.rank.rarity }}
				>
					of {character.title}
				</h2>
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
			<Stats stat="Strength" character={character} />
		</main>
	);
}

function Stats({ character, stat, angle = "cols" }: {
	character: Character;
	stat: string;
	angle?: "cols" | "rows";
}) {
	var currYearVal = new Date().getFullYear(),
		currMonthVal = new Date().getMonth();
	var months: ChronicleMonth[] = [];
	for (var i = 1; i <= 12; i++) months.push(new ChronicleMonth(i, currYearVal));
	const currMonth = months[currMonthVal];

	const getTalisman = (week: number, day: number) => {
		const date = currMonth.dateInMonth(week, day);
		console.log("🚀 ~ getTalisman ~ date:", date.toString());
		return character.stats.find((s) => s.name === stat)?.talismans[
			date.toString()
		];
	};

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
									<Talisman
										key={day}
										date={currMonth.dateInMonth(week, day)}
										talisman={getTalisman(week, day)}
									/>
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

function Talisman({ talisman, update, date }: {
	talisman?: talisman;
	update?: (talisman: talisman) => void;
	date: date;
}) {
	console.log("🚀 ~ date:", date.toString());
	const [clicked, setClicked] = React.useState(date.toString() == "26072024");
	const [isWheelOpen, setIsWheelOpen] = React.useState(false);

	const handleCellClick = () => {
		setIsWheelOpen(!isWheelOpen);
	};

	const handleRankSelect = (rank: string) => {
		// onRankSelect(day, rank);
		setIsWheelOpen(false);
	};

	return (
		<div className="relative inline-block">
			<button onClick={handleCellClick}>
				<div
					className="w-8 h-8 border-[4.5px] rounded-[2px] border-[#b87f0d]"
					style={{
						backgroundColor: talisman
							? date.toString() == "26072024"
								? "#b87f0d"
								: talisman.rarity
							: "transparent",
						borderStyle: "ridge",
					}}
				/>
			</button>
			{isWheelOpen && (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[52.5%] z-10">
					<RankWheel onSelect={handleRankSelect} />
				</div>
			)}
		</div>
	);
}

function RankWheel({ onSelect }) {
	const optionSize = 24;
	const borderWidth = 4;
	const optionGap = 6;
	const borderGap = 5;
	const hoverBorderWidth = 2;

	const numOptions = Object.keys(ranks).length;
	const optionCircumference = (optionSize + optionGap) * numOptions;
	const wheelDiameter =
		optionCircumference / Math.PI + (borderGap + optionSize + borderWidth) * 2;
	const wheelRadius = wheelDiameter / 2;
	const optionRadius = wheelRadius - borderGap - optionSize / 2 - borderWidth;

	return (
		<div
			onClick={() => onSelect(null)}
			className="bg-gray-800 bg-opacity-80 rounded-full shadow-lg flex items-center justify-center
        bg-[url(/orange_wool.png)]
      "
			style={{
				width: `${wheelDiameter}px`,
				height: `${wheelDiameter}px`,
				border: `${borderWidth}px ridge #b87f0d`,
				boxSizing: "border-box",
			}}
		>
			{Object.entries(ranks).map(([key, rank], index) => {
				const angle = (index / numOptions) * 2 * Math.PI - Math.PI / 2; // Start from top
				const x = Math.cos(angle) * optionRadius;
				const y = Math.sin(angle) * optionRadius;
				return (
					<button
						key={key}
						onClick={() => onSelect(key)}
						className="
						absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full text-xs font-bold focus:outline-none
						text-white flex items-center justify-center transition-all duration-150 ease-in-out
            "
						style={{
							width: `${optionSize}px`,
							height: `${optionSize}px`,
							left: `${wheelRadius + x}px`,
							top: `${wheelRadius + y}px`,
							backgroundColor: rank.rarity,
							border: `${hoverBorderWidth}px solid transparent`,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.border = `${hoverBorderWidth}px ridge #b87f0d`;
							e.currentTarget.style.transform = `translate(-50%, -50%) scale(1.1)`;
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.border = `${hoverBorderWidth}px solid transparent`;
							e.currentTarget.style.transform =
								"translate(-50%, -50%) scale(1)";
						}}
					>
						{rank.name[0].toUpperCase()}
					</button>
				);
			})}
		</div>
	);
}

function GrayTalisman() {
	return (
		<div
			className="w-8 h-8 border-2 rounded-[2px]"
			style={{ borderColor: "#646464" }}
		/>
	);
}
