import { WarningIcon } from "@/components/icons";

function Error({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-5 px-3 text-color-text-dimmed">
      <i>
        <WarningIcon className={`w-10 h-10`} />
      </i>
      <p>{message ?? "Something went wrong. Try Loading."}</p>
    </div>
  );
}

export default Error;
