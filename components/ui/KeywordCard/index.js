import PlayIcon from "components/icons/PlayIcon";
import PauseIcon from "components/icons/PauseIcon";
import Flexible from "../Flex";
import TrashIcon from "components/icons/TrashIcon";
import SettingIcon from "components/icons/SettingIcon";
import { useState } from "react";
import { handleUpdateOperations } from "services/operations";
import { connect } from "react-redux";
import CheckIcon from "components/icons/Check";
import classNames from "classnames";

function KeywordCard({ keyword, enabled, userToken, ID, blacklist }) {
  const [isActive, setIsActive] = useState(enabled);
  const [_keyword, setKeyword] = useState(keyword);
  const [_blacklist, setBlacklist] = useState(blacklist);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEditable = () => setEditable(!editable);

  const toggleOperation = async () => {
    const update = await handleUpdateOperations(userToken, {
      enabled: Boolean(false),
      id: ID,
    });
    console.log(update);
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const payload = {
        keyword: _keyword,
        blacklist: _blacklist,
        id: ID,
      };

      const updateData = await handleUpdateOperations(userToken, payload);

      if (updateData.code === 200) {
        setEditable(false);
      }
    } catch (error) {
      setKeyword(keyword);
      setBlacklist(blacklist);
    }

    setLoading(false);
  };

  return (
    <Flexible
      className={classNames(
        "px-4 py-3 border-[#dbe9fa] border-b last:border-b-0 border-t-0 bg-white justify-between",
        {
          "!p-2": editable,
        }
      )}
    >
      {editable ? (
        <Flexible className="w-full items-center">
          <div className="w-2/5 mr-2">
            <input
              className="py-2 h-[40px] w-full px-3 border border-[#dbe9fa] rounded-md focus:outline-none"
              onChange={(text) => setKeyword(text.target.value)}
              value={_keyword}
              placeholder="Hariç tutulacak siteler"
            />
          </div>
          <div className="w-3/5 ml-2 mr-4 ">
            <input
              className="py-2 h-[40px] w-full px-3 border border-[#dbe9fa] rounded-md focus:outline-none"
              onChange={(text) => setBlacklist(text.target.value)}
              value={_blacklist}
              placeholder="Hariç tutulacak siteler"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="flex border border-[#dbe9fa] bg-white hover:bg-blue-50 hover:bg-opacity-60 py-2 px-3 rounded-md ml-auto"
          >
            {!loading && <CheckIcon size={20} color="#5c718a" />}
            <div className="text-[#5c718a] font-medium ml-2">
              {loading ? "Güncelleniyor.." : "Güncelle"}
            </div>
          </button>
        </Flexible>
      ) : (
        <div className="font-semibold text-gray-700">{_keyword}</div>
      )}
      <Flexible>
        {!editable && (
          <>
            <button onClick={toggleOperation} className="mr-6">
              {enabled ? (
                <PauseIcon size={20} color="#435367" />
              ) : (
                <PlayIcon size={20} color="#435367" />
              )}
            </button>
            <button className="mr-6">
              <TrashIcon size={18} color="#435367" />
            </button>
            <button onClick={toggleEditable}>
              <SettingIcon size={18} color="#435367" />
            </button>
          </>
        )}
      </Flexible>
    </Flexible>
  );
}

const statements = (state) => {
  return { userToken: state.userReducer.token };
};

export default connect(statements)(KeywordCard);
