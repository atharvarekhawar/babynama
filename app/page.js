"use client";

import { FaPlay } from "react-icons/fa";
import { useRef, useState } from "react";
import { FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

export default function Home() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  

  const [input, setInput] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef();

  const updateCounter = (totalSeconds) => {
    const inputValue = totalSeconds;
    setInput(inputValue);
    const currentHours = Math.floor(inputValue / 3600);
    if (currentHours < 10) {
      setHours(`0${currentHours}`);
    } else {
      setHours(`${currentHours}`);
    }
    const currentMinutes = Math.floor((inputValue % 3600) / 60);
    if (currentMinutes < 10) {
      setMinutes(`0${currentMinutes}`);
    } else {
      setMinutes(`${currentMinutes}`);
    }
    const currentSeconds = inputValue % 60;
    if (currentSeconds < 10) {
      setSeconds(`0${currentSeconds}`);
    } else {
      setSeconds(`${currentSeconds}`);
    }
  };
  const handleInputChange = (e) => {
    if(isRunning){
      handleReset();
    }
    setInput(e.target.value * 60);
    updateCounter(e.target.value * 60);
  };

  const handlePlayPause = () => {
    if (!isRunning && input > 0) {
      setIsRunning(true);
      intervalId.current = setInterval(() => {
        setInput((prevInput) => {
          const currentInput = prevInput - 1;
          updateCounter(currentInput);
          if (currentInput === 0) {
            clearInterval(intervalId.current);
            setIsRunning(false);
          }
          return currentInput;
        });
      }, 1000);
    } else {
      clearInterval(intervalId.current);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    clearInterval(intervalId.current);
    setIsRunning(false);
    setInput(0);
    updateCounter(0);
  };

  // const handlePause = () => {
  //   clearInterval(intervalId.current);
  //   setIsRunning(false);
  // };

  return (
    <main className="flex bg-[#1E293B] min-h-screen flex-col gap-10 items-center p-24">
      <div className="flex flex-col gap-2">
        <p className="text-lg text-[#0651c9] font-medium">Enter Minutes</p>
        <input
          type="number"
          className="p-1 w-[300px] border rounded-md bg-transparent text-white outline-none "
          onChange={handleInputChange}
        />
      </div>
      <div className="flex gap-2">
        <div
          className="flex justify-center items-center w-12 h-12 cursor-pointer rounded-full bg-[#0651c9]"
          onClick={handlePlayPause}
        >
          {isRunning ? <FaPause /> : <FaPlay />}
        </div>
        <div className="flex items-center text-4xl text-[#0651c9] font-bold">
          <div>{hours}</div>
          <div>:</div>
          <div>{minutes}</div>
          <div>:</div>
          <div>{seconds}</div>
        </div>
      </div>
      <div className="flex gap-3 items-center text-lg text-white bg-[#0651c9] p-2 rounded-md cursor-pointer "
      onClick={handleReset}>
          <p>Reset</p>
          <GrPowerReset />
        </div>
    </main>
  );
}
