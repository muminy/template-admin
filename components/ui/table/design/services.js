import ActionMenu from "components/ui/action-menu";
import AddServices from "components/ui/forms/addServices";

export const designServices = [
  {
    row: "",
    action_menu: true,
    minWidth: "30px",
    maxWidth: "30px",
    placeholder: "",
    cell: (row) => <ActionMenu component={AddServices} rows={row} routeName="/services" />,
  },
  {
    row: "service_group_name",
    minWidth: "110px",
    placeholder: "Grup adı",
    cell: (row) => row.service_group.service_group_name,
  },
  {
    row: "service_name",
    minWidth: "120px",
    placeholder: "Service adı",
  },
  {
    row: "service_faq",
    minWidth: "40px",
    placeholder: "Servis SSS",
    cell: (row) => {
      return `${JSON.parse(row.service_faq).length} Adet`;
    },
  },
  {
    row: "service_short_desc",
    minWidth: "150px",
    placeholder: "Servis açıklama",
  },
  {
    row: "",
    action_menu: true,
    minWidth: "40px",
    placeholder: "",
  },
];
