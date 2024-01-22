import { cn } from "@/utils/helpers";
import HintTooltip from "@/components/ui/hint-tooltip";

const formattedPostDate = (createdAt) => {
  const createdDate = new Date(createdAt);
  const formattedTime = createdDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedDate = createdDate.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const longForm = `${formattedTime} · ${formattedDate}`;

  const now = new Date();

  const timeDifferenceInSeconds = Math.floor((now - createdDate) / 1000);
  let shortForm;
  if (timeDifferenceInSeconds < 60) {
    shortForm = `${timeDifferenceInSeconds}s`;
  } else if (timeDifferenceInSeconds < 3600) {
    // less than an hour
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    shortForm = `${minutes}m`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    shortForm = `${hours}h`;
  } else if (createdDate.getFullYear() === now.getFullYear()) {
    const options = { month: "short", day: "numeric" };
    shortForm = createdDate.toLocaleDateString("default", options);
  } else {
    const options = { month: "short", year: "numeric" };
    shortForm = createdDate.toLocaleDateString("default", options);
  }

  return { longForm, shortForm };
};

export default function PostDate({ createdAt, full, className }) {
  const displayTime = formattedPostDate(createdAt);

  const classes = cn(
    "text-color-text-dimmed hover:underline cursor-pointer",
    className
  );

  const renderedTime = (
    <HintTooltip content={displayTime.longForm}>
      <div className={classes}>
        <time dateTime={new Date(createdAt).toISOString()} className={classes}>
          {full ? displayTime.longForm : displayTime.shortForm}
        </time>
      </div>
    </HintTooltip>
  );

  return renderedTime;
}
