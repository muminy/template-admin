import Flexible from "../Flex";

export default function SiteCard({ website }) {
  return (
    <Flexible className="px-4 py-3 border-[#dbe9fa] border-b last:border-b-0 border-t-0 bg-white justify-between">
      <div className="font-semibold text-gray-700">{website}</div>
    </Flexible>
  );
}
