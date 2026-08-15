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
      <>
        <style>
          {`
            .citation-annotation {
              border-bottom: 1px dotted rgba(23, 23, 23, 0.75);
              box-decoration-break: clone;
              -webkit-box-decoration-break: clone;
              padding-bottom: 0.02em;
            }

            .citation-annotation::after {
              content: "[cite]";
              display: inline-block;
              margin-left: 0.08em;
              font-size: 0.68em;
              line-height: 0;
              vertical-align: super;
            }

            .citation-annotation:has(+ .citation-annotation)::after {
              content: "";
              margin-left: 0;
            }
          `}
        </style>
        <span className="citation-annotation">{props.textElement}</span>
      </>
    )
  });
}
