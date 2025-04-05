import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[750px]">
      <ClipLoader color="#ef4444" size={120} />
    </div>
  );
}
