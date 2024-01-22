import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import toast from "react-hot-toast";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function stopBubbling(callback) {
  return (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof callback === "function") callback();
  };
}

export function formatNumber(number) {
  return new Intl.NumberFormat("en-GB", {
    notation: number > 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(number);
}

function getFullTime(date) {
  const fullDate = new Intl.DateTimeFormat("en-gb", {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  const splittedDate = fullDate.split(", ");

  const formattedDate =
    splittedDate.length === 2
      ? [...splittedDate].reverse().join(" · ")
      : [splittedDate.slice(0, 2).join(", "), splittedDate.slice(-1)]
          .reverse()
          .join(" · ");

  return formattedDate;
}

export function getMonthYear(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export const copyToClipboard = () => {
  const currentUrl = window.location.href;
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      toast.success("Link copied to clipboard!");
    })
    .catch((err) => {
      console.error("copyToClipboard: ", err);
      console.success("Failed to copy link");
    });
};
