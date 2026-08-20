import type { BlockDecoratorProps } from "sanity";

export function PullQuoteToolbarLabel() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        minWidth: "2.85rem",
        fontSize: "0.72rem",
        fontWeight: 700,
        lineHeight: 1,
        textAlign: "center"
      }}
    >
      Quote
    </span>
  );
}

export function PullQuoteDecorator(props: BlockDecoratorProps) {
  return (
    <span
      style={{
        borderBottom: "1px dotted rgba(23, 23, 23, 0.75)",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
        paddingBottom: "0.02em"
      }}
    >
      {props.children}
    </span>
  );
}
