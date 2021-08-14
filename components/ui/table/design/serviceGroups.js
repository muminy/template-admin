import ActionMenu from "components/ui/action-menu";
import AddServiceGroups from "components/ui/forms/addServiceGroups";

export const designServiceGroups = [
  {
    row: "",
    action_menu: true,
    minWidth: "30px",
    maxWidth: "30px",
    placeholder: "",
    cell: (row) => (
      <ActionMenu component={AddServiceGroups} rows={row} routeName="/service-groups" />
    ),
  },
  {
    row: "service_group_name",
    minWidth: "110px",
    placeholder: "Hizmet adı",
  },
  {
    row: "service_group_gender",
    minWidth: "120px",
    placeholder: "Hizmet cinsi",
    cell: (row) => {
      if (row.service_group_gender === 1) {
        return "Erkek";
      } else {
        return "Kadın";
      }
    },
  },
  {
    row: "service_group_branch",
    minWidth: "40px",
    placeholder: "Hizmet şubesi",
  },
];
