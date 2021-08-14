import ActionMenu from "components/ui/action-menu";
import AddBlog from "components/ui/forms/addBlog";

export const designBlog = [
  {
    row: "",
    action_menu: true,
    minWidth: "30px",
    maxWidth: "30px",
    placeholder: "",
    cell: (row) => <ActionMenu component={AddBlog} rows={row} routeName="/blog" />,
  },
  {
    row: "blog_title",
    minWidth: "150px",
    placeholder: "Başlık",
  },
  {
    row: "blog_short_desc",
    minWidth: "280px",
    placeholder: "Kısa Açıklama",
  },
  {
    row: "blog_created_at",
    minWidth: "60px",
    placeholder: "Tarih",
  },
];
