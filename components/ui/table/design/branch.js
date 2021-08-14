import MenuIcon from "components/icons/MenuIcon";
import ActionMenu from "components/ui/action-menu";
import addBranch from "components/ui/forms/addBranch";

export const designBranch = [
  {
    row: "",
    action_menu: true,
    minWidth: "30px",
    maxWidth: "30px",
    placeholder: "",
    cell: (row) => <ActionMenu component={addBranch} rows={row} routeName="/branch/delete" />,
  },
  {
    row: "branch_name",
    minWidth: "100px",
    placeholder: "Ad",
  },
  {
    row: "branch_adress",
    minWidth: "100px",
    placeholder: "Adres",
  },
  {
    row: "branch_mail",
    minWidth: "100px",
    placeholder: "Mail",
  },
  {
    row: "branch_phone",
    minWidth: "100px",
    placeholder: "Telefon",
  },
  {
    row: "branch_content",
    minWidth: "100px",
    placeholder: "İçerik",
    maxWidth: "120px",
  },
];
