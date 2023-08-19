"use client";
import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { MdClear } from "react-icons/md";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const containerRef = useRef(null);

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClearInput = () => {
    setSearchValue("");
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setInputFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`group flex items-center justify-between gap-4 rounded-full bg-th-background-secondary p-3
        transition border border-th-background
        focus-within:border-th-accent-dark focus-within:bg-th-background`}
      ref={containerRef}
    >
      <div
        className={`ml-3 p-1 text-th-primary-light group-focus-within:text-th-accent-dark`}
      >
        <BsSearch className={`h-5 w-5`} />
      </div>
      <div className={`flex flex-grow`}>
        <input
          className={`peer flex-1 bg-transparent outline-none
            dark:placeholder:text-dark-secondary`}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchValueChange}
          onFocus={() => setInputFocus(true)}
        />

        {searchValue && inputFocus && (
          <div
            className={`rounded-full bg-th-accent-dark text-th-primary-light p-1`}
            onClick={handleClearInput}
          >
            <MdClear className={`w-4 h-4`} />
          </div>
        )}
      </div>
    </div>
  );
}
