import { Character, ChronicleMonth } from "@/app/page";
import { HStack, VStack } from "./stacks";

function VerticalStats({ character }: { character: Character }) {
	var currYearVal = new Date().getFullYear();
	var currMonthVal = new Date().getMonth();
  
	var months: ChronicleMonth[] = [];
	for (var i = 1; i <= 12; i++)
	  months.push(new ChronicleMonth(i, currYearVal));
	const currMonth = months[currMonthVal];
  
	return (
	  <VStack className="items-center space-y-4 text-2xl text-[#f7a22d] font-gaelic">
		<div>
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