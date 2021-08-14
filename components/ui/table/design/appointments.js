import ActionMenu from "components/ui/action-menu";

export const designAppointments = [
  {
    row: "",
    action_menu: true,
    minWidth: "30px",
    maxWidth: "30px",
    placeholder: "",
    cell: (row) => <ActionMenu rows={row} routeName="/appointment" />,
  },
  {
    row: "appointment_name",
    minWidth: "100px",
    placeholder: "Ad",
  },
  {
    row: "appointment_phone",
    minWidth: "80px",
    placeholder: "Telefon",
  },
  {
    row: "appointment_date",
    minWidth: "130px",
    placeholder: "Tarih",
  },
  {
    row: "appointment_treatment",
    minWidth: "100px",
    placeholder: "Tedavi",
  },
  {
    row: "appointment_message",
    minWidth: "130px",
    placeholder: "Mesaj",
  },
];
