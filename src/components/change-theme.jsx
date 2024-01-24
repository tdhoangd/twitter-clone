"use client";

import {
  CheckmarkIcon,
  CloseIcon,
  OutlineThreedotIcon,
  SettingIcon,
} from "@/components/icons";
import { PageHeaderWrapper } from "@/components/layouts/page-header-wrapper";
import NavItem from "@/components/navigation-sidebar/nav-item";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdonw-menu";
import { useTheme } from "@/features/theme";
import { cn } from "@/utils/helpers";
import { useState } from "react";

export function ChangeTheme() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, accent, setAccent } = useTheme();

  const handleSave = () => {
    // TODO: change theme in server
  };

  console.log(theme, accent);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="2xl:w-full outline-none">
          <NavItem title={"More"} icon={<OutlineThreedotIcon />} />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
          <div className="py-1 w-[285px]">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <div className="text-lg font-bold flex items-center w-full">
                    <SettingIcon />
                    <div className="ml-5">Change Theme</div>
                  </div>
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogContent>
                <PageHeaderWrapper withNavigationBack={false}>
                  <div className="flex flex-row w-full items-center">
                    <div className="min-w-[56px] outline-none ">
                      <Button
                        size="icon"
                        variant="primary"
                        className="text-2xl"
                        onClick={() => setOpen(false)}
                      >
                        <CloseIcon />
                      </Button>
                    </div>

                    <div className="grow text-lg font-bold">
                      <span>Change Theme</span>
                    </div>

                    <Button
                      variant="primaryInverse"
                      size="sm"
                      onClick={handleSave}
                    >
                      <span>Save</span>
                    </Button>
                  </div>
                </PageHeaderWrapper>

                <div className="">
                  <div className="my-1 h-[1px] bg-color-border"></div>

                  <div className="px-4 py-3">
                    <h2 className="font-bold text-xl">Color</h2>
                  </div>

                  <div className="py-2">
                    <div className="flex justify-around items-center flex-wrap">
                      {[
                        "blue",
                        "yellow",
                        "red",
                        "purple",
                        "orange",
                        "green",
                      ].map((color) => (
                        <label
                          key={color}
                          className={cn(
                            "relative cursor-pointer  py-1 h-11 w-11 rounded-full  flex justify-center items-center",
                            {
                              "bg-color-blue": color === "blue",
                              "bg-color-yellow": color === "yellow",
                              "bg-color-red": color === "red",
                              "bg-color-purple": color === "purple",
                              "bg-color-orange": color === "orange",
                              "bg-color-green": color === "green",
                            }
                          )}
                        >
                          <CheckmarkIcon
                            className={cn("font-bold text-xl text-white", {
                              hidden: accent !== color,
                            })}
                          />
                          <input
                            type="radio"
                            name="accent-color"
                            value={color}
                            checked={accent === color}
                            onChange={() => setAccent(color)}
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="my-2 h-[1px] bg-color-border"></div>

                  <div className="px-4 py-3">
                    <h2 className="font-bold text-xl">Background</h2>
                  </div>
                  <div className="px-4 py-1 ">
                    <div className="flex flex-col sm:flex-row justify-evenly  ">
                      {["default", "dim", "light"].map((background) => (
                        <div
                          key={background}
                          className={cn(
                            `group relative min-h-16 w-full bg-color-bg-${background}  border-2 m-1 px-5 items-center flex rounded`,
                            {
                              "border-color-accent ": theme === background,
                              "text-white": background !== "light",
                              "bg-color-bg-default": background === "default",
                              "bg-color-bg-dim": background === "dim",
                              "text-black bg-color-bg-light":
                                background === "light",
                            }
                          )}
                        >
                          <input
                            type="radio"
                            value={background}
                            checked={theme === background}
                            onChange={() => setTheme(background)}
                            className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
                          />

                          <div
                            className={cn(
                              "rounded-full flex justify-center items-center h-10 w-10  ",
                              {
                                "group-hover:bg-color-accent/30":
                                  theme === background,
                                "group-hover:bg-color-border/20":
                                  theme !== background,
                              }
                            )}
                          >
                            <div
                              className={cn(
                                " rounded-full p-1 w-5 h-5 flex justify-center items-center border-2 border-transparent",
                                {
                                  "border-color-border": theme !== background,
                                  "bg-color-accent": theme === background,
                                }
                              )}
                              role="radio"
                              aria-checked={false}
                            >
                              <CheckmarkIcon
                                className={theme !== background && "hidden"}
                              />
                            </div>
                          </div>

                          <div className="ml-1 flex justify-center items-center grow font-bold">
                            <span>
                              {background.charAt(0).toUpperCase() +
                                background.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-20"></div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
