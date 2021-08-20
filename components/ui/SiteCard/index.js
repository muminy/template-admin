import CancelIcon from "components/icons/Cancel";
import { handleRemoveWebsite } from "services/website";
import Flexible from "../Flex";

export default function SiteCard({ website, deletedItem, itemIndex }) {
  const handleRemoveItem = async () => {
    const permission = confirm(`${website} Silmek istediğinize emin misiniz?`);

    if (permission) {
      const remove = await handleRemoveWebsite(itemIndex);

      if (remove.code && remove.code === 200) {
        deletedItem(itemIndex);
      }
    }
  };

  return (
    <Flexible className="px-1 py-1 border-[#dbe9fa] border-b last:border-b-0 border-t-0 bg-white justify-between items-center">
      <div className="font-semibold text-gray-700 pl-4">{website}</div>
      <button
        onClick={handleRemoveItem}
        className="border border-[#dbe9fa] py-2 px-2 rounded-md flex items-center"
      >
        <CancelIcon color="#5c718a" size={18} />
      </button>
    </Flexible>
  );
}
