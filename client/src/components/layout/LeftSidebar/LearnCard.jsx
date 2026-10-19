import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "../../common/Card";
const learnIcon = "/assets/Chomeicon/LEARN.svg";
const learnHubIcon = "/assets/Chomeicon/LEARN-HUB.svg";
const eventAvailableIcon = "/assets/Chomeicon/material-symbols_event-available-outline.svg";
const Flashcards = "/assets/Chomeicon/Flashcards.svg";
const Scenario = "/assets/Chomeicon/Scenario-Lab.svg";
import { Link } from "react-router-dom";

export default function LearnCard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="select-none bg-white">
      {/* Header */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left cursor-pointer"
      >
        <div className="flex items-center gap-3.5">
          <img src={learnIcon} className="w-5 h-5 object-contain" alt="Learn" />
          <span className="text-[17px]   text-slate-800">
            Learn
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button> */}

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 ease-in-out  flex flex-col gap-4 ${
          isOpen ? "max-h-40 opacity-100 mt-5" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <button className="flex items-center gap-3.5 text-[15px]   text-slate-800 hover:text-[#0096FF] text-left cursor-pointer transition-colors duration-150">
          <img src={learnHubIcon} className="w-5 h-5 object-contain" alt="Learn Hub" />
          <span>Learn Hub</span>
        </button>
        <button className="flex items-center gap-3.5 text-[15px]   text-slate-800 hover:text-[#0096FF] text-left cursor-pointer transition-colors duration-150">
          <img src={eventAvailableIcon} className="w-5 h-5 object-contain" alt="Quiz Arena" />
          <span>Quiz Arena</span>
        </button>
        <button className="flex items-center gap-3.5 text-[15px]   text-slate-800 hover:text-[#0096FF] text-left cursor-pointer transition-colors duration-150">
          <img src={Scenario} className="w-5 h-5 object-contain" alt="Learn Hub" />
          <span>Scenario Lab</span>
        </button>
        <button className="flex items-center gap-3.5 text-[15px]   text-slate-800 hover:text-[#0096FF] text-left cursor-pointer transition-colors duration-150">
          <img src={Flashcards} className="w-5 h-5 object-contain" alt="Quiz Arena" />
          <span>Flashcards</span>
        </button>
      </div>

      {/* Divider */}
      {/* <div className="border-t border-gray-200/60 my-5" /> */}

      {/* Footer / About Links */}
      <div className="flex flex-col text-[12px] text-gray-500 font-medium">
        {/* <div className="flex items-center gap-2 text-gray-500  ">
          <a href="#" className="hover:text-[#0096FF] transition-colors duration-150">Help</a>
          <span>•</span>
          <a href="#" className="hover:text-[#0096FF] transition-colors duration-150">Terms</a>
        </div> */}
        <div className="mt-3.5 text-[11px] text-gray-400 font-blod   leading-relaxed">
          <Link to="https://egrowthindia.com" target="_blank" className="hover:text-[#0096FF] transition-colors duration-150">
            egrowthindia.com 
          </Link>
           {' '}© 2026 eGrowth India
        </div>
      </div>
    </Card>
  );
}
