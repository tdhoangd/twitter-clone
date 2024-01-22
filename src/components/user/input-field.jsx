"use client";

import { cn } from "@/utils/helpers";
import React, { useRef } from "react";

export function InputField({
  label,
  textarea,
  limit = 30,
  required,
  value,
  onChange,
}) {
  const inputRef = useRef(null);

  const inputLength = Math.max(0, value?.length);

  const handleInputChange = (event) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <div className="py-3 px-4 flex flex-col group">
      <label
        htmlFor="name"
        className={cn("border rounded border-color-border", {
          "group-focus-within:border-color-accent ": !(
            required && inputLength === 0
          ),
          "border-red-800": required && inputLength === 0,
        })}
        onClick={() => inputRef.current.focus()}
      >
        <div className="flex flex-col shrink grow relative">
          <div className="absolute flex w-full justify-between text-color-text-dimmed ">
            <div
              className={cn(
                "text-lg group-focus-within:text-sm px-2 pt-4 group-focus-within:pt-2 group-focus-within:text-color-accent leading-6",
                {
                  "text-sm pt-2": inputLength > 0,
                  "group-focus-within:text-red-800":
                    required && inputLength === 0,
                }
              )}
            >
              <span>{label}</span>
            </div>
            <div className="text-sm items-end justify-end grow px-2 flex">
              <span className="hidden group-focus-within:block">
                {inputLength}/{limit}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 px-2 pb-2 flex flex-auto overflow-hidden">
            {textarea ? (
              <div className="leading-6 flex text-lg w-full">
                <textarea
                  rows={3}
                  type="text"
                  value={value || ""}
                  ref={inputRef}
                  id="edit-profile-name"
                  className="w-full"
                  maxLength={limit}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div className="leading-6 flex text-lg w-full">
                <input
                  required={required}
                  type="text"
                  value={value || ""}
                  ref={inputRef}
                  id="edit-profile-name"
                  className="w-full"
                  maxLength={limit}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
        </div>
      </label>
      <div className="text-red-800 text-sm px-2 font-bold">
        {required && inputLength === 0 && (
          <span>
            {label} {" can't be blank"}
          </span>
        )}
      </div>
    </div>
  );
}
