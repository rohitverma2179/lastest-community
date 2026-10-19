import React from "react";
import { ChevronDown, User, Archive, Settings, LogOut } from "lucide-react";
import Avatar from "../../common/Avatar";
import Dropdown from "../../common/Dropdown";
import { CURRENT_USER } from "../../../data/users";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../features/auth/user.thunk";
const saveicon = "/assets/Chomeicon/save.svg";

export default function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const displayName = user
    ? (user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim())
    : CURRENT_USER.name;
  const displayAvatar = user?.avatar || CURRENT_USER.avatar;

  const handleSignOut = async (close) => {
    close();
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    navigate("/");
  };

  const trigger = (
    <div className="flex items-center gap-0 hover:opacity-90 transition duration-150 select-none cursor-pointer">
      <Avatar src={displayAvatar} name={displayName} size="sm" />
      <div className="flex items-center  text-gray-600">
        {/* <span className="text-xs font-medium">Me</span> */}
        <ChevronDown className="w-3.5 h-3.5 stroke-[2]" />
      </div>
    </div>
  );

  return (
    <Dropdown trigger={trigger} align="right">
      {(close) => (
        <div className="w-48 p-2 text-sm bg-white rounded-xl shadow-lg border border-gray-100/80 space-y-0.5">
          <button
            onClick={() => {
              close();
              navigate("/portal/profile");
            }}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-left rounded-lg text-[#1e293b] hover:bg-slate-50 transition-colors duration-150 font-medium text-[14px] cursor-pointer"
          >
            <User className="w-[18px] h-[18px] text-[#334155] stroke-[1.75]" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => {
              close();
              navigate("/portal/wishlist");
            }}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-left rounded-lg text-[#1e293b] hover:bg-slate-50 transition-colors duration-150 font-medium text-[14px]"
          >
            {/* <Archive className="" /> */}
            <img src={saveicon.src || saveicon} className="w-[18px] h-[18px] opacity-60 text-[#334155] stroke-[1.75]" alt="save" />
            <span>Wishlist</span>
          </button>

          <button
            onClick={() => {
              close();
              navigate("/portal/settings");
            }}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-left rounded-lg text-[#1e293b] hover:bg-slate-50 transition-colors duration-150 font-medium text-[14px]"
          >
            <Settings className="w-[18px] h-[18px] text-[#334155] stroke-[1.75]" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => {
              handleSignOut(close);
            }}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-left rounded-lg text-[#ff4d4f] hover:bg-red-50/80 transition-colors duration-150 font-medium text-[14px]"
          >
            <LogOut className="w-[18px] h-[18px] text-[#ff4d4f] stroke-[1.75]" />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </Dropdown>
  );
}