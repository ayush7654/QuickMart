import React ,{useState}from "react";
import "./Testing.css";
import IconButton from "../IconButton/IconButton";
// LOCK icons
import { FiLock } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { BsLock } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

// MAIL / LETTER icons
import { FiMail } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { BsEnvelope } from "react-icons/bs";
import { HiMail } from "react-icons/hi";

// USER icons
import { FiUser } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { HiUser } from "react-icons/hi";


export default function Testing() {



  return (
    <div className="testing-div">
   
      {/* LOCK */}
      <section>
        <h3>Lock Icons</h3>
        <div className="icon-row">
          <FiLock />
          <MdLock />
          <BsLock />
          <HiLockClosed /> {/*  */}
        </div>
      </section>

      {/* MAIL */}
      <section>
        <h3>Mail / Letter Icons</h3>
        <div className="icon-row">
          <FiMail />
          <MdEmail />
          <BsEnvelope />
          <HiMail />{/*  */}
        </div>
      </section>

      {/* USER */}
      <section>
        <h3>User Icons</h3>
        <div className="icon-row">
          <FiUser />
          <MdPerson /> {/*  */}
          <BsPersonCircle />
          <HiUser />
        </div>
      </section>
    </div>
  );
};
