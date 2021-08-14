import ActionMenu from "components/ui/action-menu";
import AddStaffs from "components/ui/forms/addStaffs";

export const designStaff = [
  {
    row: "",
    action_menu: true,
    minWidth: "30px",
    maxWidth: "30px",
    placeholder: "",
    cell: (row) => <ActionMenu component={AddStaffs} rows={row} routeName="/staffs" />,
  },
  {
    row: "staff_name",
    minWidth: "100px",
    placeholder: "Ad",
  },
  {
    row: "staff_bio",
    minWidth: "100px",
    placeholder: "Bio",
  },
  {
    row: "staff_twitter",
    minWidth: "100px",
    placeholder: "Twitter",
  },
  {
    row: "staff_facebook",
    minWidth: "100px",
    placeholder: "Facebook",
  },
  {
    row: "staff_instagram",
    minWidth: "100px",
    placeholder: "İnstagram",
  },
  {
    row: "",
    action_menu: true,
    minWidth: "40px",
    placeholder: "",
  },
];
