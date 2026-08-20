import type { BlockDecoratorProps } from "sanity";

export function InterviewToolbarLabel() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        minWidth: "4rem",
        fontSize: "0.72rem",
        fontWeight: 700,
        lineHeight: 1,
        textAlign: "center"
      }}
    >
      Interview
    </span>
  );
}

export function InterviewDecorator(props: BlockDecoratorProps) {
  return (
    <span
      style={{
        float: "inline-start",
        marginBottom: "1rem",
        marginRight: "2rem"
      }}
    >
      {props.children}
    </span>
  );
}
