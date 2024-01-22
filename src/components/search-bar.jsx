"use client";
import React, { useState, useEffect, useRef } from "react";
import { ClearIcon, SearchIcon } from "@/components/icons";

export function SearchBar() {
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
      className={`group flex items-center justify-between gap-4 rounded-full bg-color-bg-3 p-3
        transition border border-color-bg
        focus-within:border-color-accent focus-within:bg-color-bg`}
      ref={containerRef}
    >
      <div className="ml-3 p-1 text-color-text-dimmed group-focus-within:text-color-accent">
        <SearchIcon className="h-5 w-5" />
      </div>
      <div className="flex flex-grow">
        <input
          className="peer flex-1 bg-transparent outline-none dark:placeholder:text-dark-secondary"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchValueChange}
          onFocus={() => setInputFocus(true)}
        />

        {searchValue && inputFocus && (
          <div
            className="rounded-full bg-color-accent text-color-text-main p-1"
            onClick={handleClearInput}
          >
            <ClearIcon className={`w-4 h-4`} />
          </div>
        )}
      </div>
    </div>
  );
}
