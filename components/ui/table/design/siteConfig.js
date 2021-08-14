import ActionMenu from "components/ui/action-menu";
import AddSiteConfig from "components/ui/forms/addSiteConfig";

export const designSiteConfig = [
  {
    row: "",
    action_menu: true,
    minWidth: "30px",
    maxWidth: "30px",
    placeholder: "",
    cell: (row) => (
      <ActionMenu disableRemove component={AddSiteConfig} rows={row} routeName="/site-settings" />
    ),
  },
  {
    row: "site_vision",
    minWidth: "110px",
    placeholder: "Vizyon",
  },
  {
    row: "site_mission",
    minWidth: "110px",
    placeholder: "Misyon",
  },
  {
    row: "site_about_us",
    minWidth: "120px",
    placeholder: "Hakkımızda",
  },
  {
    row: "site_facebook",
    minWidth: "40px",
    placeholder: "Facebook",
  },
  {
    row: "site_youtube",
    minWidth: "150px",
    placeholder: "Youtube",
  },
  {
    row: "site_instagram",
    minWidth: "40px",
    placeholder: "İnstagram",
  },
  {
    row: "site_address",
    minWidth: "40px",
    placeholder: "Adres",
  },
  {
    row: "site_mail",
    minWidth: "40px",
    placeholder: "Mail",
  },
  {
    row: "site_call_phone",
    minWidth: "40px",
    placeholder: "Telefon",
  },
  {
    row: "site_wp_phone",
    minWidth: "40px",
    placeholder: "Whatsapp iletişim",
  },
];
