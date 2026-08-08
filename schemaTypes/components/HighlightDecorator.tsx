import type { BlockDecoratorProps } from "sanity";

export function HighlightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4.5 19.5 9.5" />
      <path d="m6 18 1.1-4.2 8.2-8.2 5 5-8.2 8.2L8 20Z" />
      <path d="M4 20h7.5" />
    </svg>
  );
}

export function HighlightDecorator(props: BlockDecoratorProps) {
  return (
    <span
      style={{
        backgroundColor: "rgba(252, 255, 203, 0.7)",
        borderBottom: "1px dotted rgba(23, 23, 23, 0.55)",
        borderRadius: "0.1em",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
        padding: "0.02em 0.12em"
      }}
    >
      {props.children}
    </span>
  );
}
