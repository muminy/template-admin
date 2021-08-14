import ActionMenu from "components/ui/action-menu";
import AddEvent from "components/ui/forms/addEvent";
import moment from "moment";

export const designEvent = [
  {
    row: "",
    action_menu: true,
    minWidth: "30px",
    maxWidth: "30px",
    placeholder: "",
    cell: (row) => (
      <ActionMenu component={AddEvent} editStatus="event_status" rows={row} routeName="/event" />
    ),
  },
  {
    row: "event_title",
    minWidth: "130px",
    placeholder: "Başlık",
  },
  {
    row: "event_short_desc",
    minWidth: "170px",
    placeholder: "Kısa içerik",
  },
  {
    row: "event_finish_date",
    minWidth: "100px",
    maxWidth: "220px",
    placeholder: "Bitiş Tarihi",
    cell: (row) => moment(row.event_finish_date).format("YYYY-MM-DD"),
  },
  {
    row: "event_finish_date",
    minWidth: "60px",
    placeholder: "Etkinlik Durumu",
    maxWidth: "60px",
    cell: (row) => {
      const today = moment(new Date());
      const finishDate = moment(row.event_finish_date);
      const isFinished = finishDate.diff(today, "days") < 0;
      if (isFinished) {
        return <div className="text-red-600 font-semibold">Süresi doldu</div>;
      } else if (row.event_status === 0) {
        return <div className="text-red-600 font-semibold">İptal edildi</div>;
      } else {
        return <div className="text-green-600 font-semibold">Aktif</div>;
      }
    },
  },
];
