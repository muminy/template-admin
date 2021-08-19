import PlayIcon from "components/icons/PlayIcon";
import PauseIcon from "components/icons/PauseIcon";
import Flexible from "../Flex";

export default function LinkCard({ link, keyword, isActive, totals }) {
  return (
    <Flexible className="px-4 py-3 border-[#dbe9fa] border-b last:border-b-0 border-t-0 bg-white justify-between">
      <div className="font-semibold text-gray-700">{link}</div>
      <div className="font-semibold text-gray-700">{keyword}</div>
      <div className="font-semibold text-blue-700">{totals}</div>
      <Flexible>
        <button>
          {isActive ? (
            <PauseIcon size={20} color="#435367" />
          ) : (
            <PlayIcon size={20} color="#435367" />
          )}
        </button>
      </Flexible>
    </Flexible>
  );
}
