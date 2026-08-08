import type { BlockAnnotationProps } from "sanity";

export function CitationIcon() {
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
      <path d="M7 5h10" />
      <path d="M7 12h10" />
      <path d="M7 19h6" />
      <path d="M4 5h.01" />
      <path d="M4 12h.01" />
      <path d="M4 19h.01" />
    </svg>
  );
}

export function CitationAnnotation(props: BlockAnnotationProps) {
  return props.renderDefault({
    ...props,
    textElement: (
      <span
        style={{
          borderBottom: "1px dotted rgba(23, 23, 23, 0.75)",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
          paddingBottom: "0.02em"
        }}
      >
        {props.textElement}
        <sup style={{ fontSize: "0.68em", marginLeft: "0.08em" }}>[cite]</sup>
      </span>
    )
  });
}
