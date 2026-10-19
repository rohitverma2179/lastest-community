import React from "react";
import { UserPlus, Sparkles } from "lucide-react";
import Card from "../../common/Card";

export default function InviteCard() {
  return (
    <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100/50 p-4 select-none group hover:shadow-md transition duration-200">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-100/80 flex items-center justify-center shrink-0">
          <UserPlus className="w-5 h-5 text-[#0096FF]" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1">
            Invite a colleague
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          </h3>
          <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
            Both earn <span className="text-[#0096FF] font-bold">+100 Merit</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
