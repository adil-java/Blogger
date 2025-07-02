import React from "react";
import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assert";
import { DivideSquareIcon } from "lucide-react";

export default function Nav() {

  const navigate =useNavigate();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer border-b-2 border-primary-300">
    
      <img
      onClick={()=>navigate("/")}
          src={assets.react_log}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center text-xl font-semibold text-violet-500">
          Blogger
        </span>
      

      <div className="flex md:order-2 text-white w-auto   items-center gap-2 rounded-full text-sm bg-primary-600 cursor-pointer px-10 py-2.5">
        {/* Injected auth buttons from App.jsx */}
       Sigu Up

      </div>

      

    </div>
  );
}
