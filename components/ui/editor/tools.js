import CheckList from "@editorjs/checklist";
import Table from "@editorjs/table";
import Image from "@editorjs/image";
import NestedList from "@editorjs/nested-list";
import LinkTool from "@editorjs/link";
import Underline from "@editorjs/underline";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";

export const tools = {
  checklist: CheckList,
  table: {
    class: Table,
  },
  image: {
    class: Image,
  },
  list: NestedList,
  linkTool: LinkTool,
  underline: Underline,
  quote: Quote,
  marker: Marker,
};
