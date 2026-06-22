import React from "react";
import { options } from "@/lib/data";

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">Show:</span>
      <select
        value={dateQuery}
        onChange={(e) => setDateQuery(e.target.value)}
        className="h-10 px-3 py-2 text-sm bg-white border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 shadow-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateTimeFilter;
