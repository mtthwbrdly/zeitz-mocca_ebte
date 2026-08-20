import type { BlockAnnotationProps } from "sanity";

export function CitationToolbarLabel() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        minWidth: "2.25rem",
        fontSize: "0.72rem",
        fontWeight: 700,
        lineHeight: 1,
        textAlign: "center"
      }}
    >
      Cite
    </span>
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
