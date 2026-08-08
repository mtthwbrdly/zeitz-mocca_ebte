import type { BlockDecoratorProps } from "sanity";

export function PullQuoteIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 7.5c-2 1.3-3 3.3-3 5.8h3.8v5.2H4.5v-4.7c0-3.4 1.5-6.2 4-8.3Z" />
      <path d="M18.5 7.5c-2 1.3-3 3.3-3 5.8h3.8v5.2h-4.8v-4.7c0-3.4 1.5-6.2 4-8.3Z" />
    </svg>
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
