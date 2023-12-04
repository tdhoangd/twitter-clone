import { BsExclamationTriangle } from "react-icons/bs";

function Error({ message }) {
  return (
    <div
      className={`fi items-center justify-center gap-4 py-5 px-3 text-th-primary-light`}
    >
      <i>
        <BsExclamationTriangle className={`w-10 h-10`} />
      </i>
      <p>{message ?? "Something went wrong. Try Loading."}</p>
    </div>
  );
}

export default Error;
