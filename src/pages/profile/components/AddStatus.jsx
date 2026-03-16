import { formatLastActive } from "../../../utils/formatLastActive";

function AddStatus({ isActive, lastActiveAt }) {
  return (
    <div className="flex items-center gap-2 text-sm">

      {isActive ? (
        <>
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
          <span className="font-medium">Active</span>
        </>
      ) : (
        <>
          <span className="w-2.5 h-2.5 bg-gray-300 rounded-full"></span>
          <span className="text-gray-200">
            {formatLastActive(lastActiveAt)}
          </span>
        </>
      )}

    </div>
  );
}

export default AddStatus;
