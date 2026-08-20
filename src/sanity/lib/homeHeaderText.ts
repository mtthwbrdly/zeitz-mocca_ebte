import type { PortableTextBlock } from "./types";

export const defaultHomeHeaderText: PortableTextBlock[] = [
  {
    _key: "home-header-text",
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: "home-header-text-title",
        _type: "span",
        marks: ["em"],
        text: "Everything but the Exhibition"
      },
      {
        _key: "home-header-text-1",
        _type: "span",
        marks: [],
        text:
          " is an online publication exploring the curatorial beyond the exhibition itself. "
      },
      {
        _key: "home-header-text-everything",
        _type: "span",
        marks: ["em"],
        text: "Everything"
      },
      {
        _key: "home-header-text-2",
        _type: "span",
        marks: [],
        text:
          ", here, means both 'preceding and surrounding' and 'aftermath,' refusing the fiction that the exhibition is the ultimate act and instead, turns to the research, the arguments, the false starts, the logistics, the public conversations, and all the other labour that is edited and happening elsewhere."
      }
    ]
  }
];
