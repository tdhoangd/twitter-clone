import { formatNumber } from "@/utils/helpers";
import React from "react";

export function StatNumber({ stat }) {
  return (
    <span className="overflow-hidden">
      <span>{formatNumber(stat)}</span>
    </span>
  );
}
