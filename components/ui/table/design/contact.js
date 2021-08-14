import ActionMenu from "components/ui/action-menu";

export const designContact = [
  {
    row: "",
    action_menu: true,
    minWidth: "30px",
    maxWidth: "30px",
    placeholder: "",
    cell: (row) => <ActionMenu editStatus="contact_status" rows={row} routeName="/contact" />,
  },
  {
    row: "contact_name",
    minWidth: "150px",
    placeholder: "Adı",
  },
  {
    row: "contact_treatment",
    minWidth: "280px",
    placeholder: "Tedavi",
  },
  {
    row: "contact_date",
    minWidth: "60px",
    placeholder: "Tarih",
  },
  {
    row: "contact_phone",
    minWidth: "60px",
    placeholder: "Telefon",
  },
  {
    row: "contact_message",
    minWidth: "60px",
    placeholder: "Mesaj",
  },
  {
    row: "branch.branch_name",
    minWidth: "60px",
    placeholder: "Şube",
    cell: (row) => row.branch.branch_name,
  },
  {
    row: "Durumu",
    minWidth: "60px",
    placeholder: "Şube",
    cell: (row) =>
      row.contact_status === 0 ? (
        <div className="text-red-600 font-semibold">İptal Edildi</div>
      ) : (
        <div className="text-green-600 font-semibold">Aktif</div>
      ),
  },
];
