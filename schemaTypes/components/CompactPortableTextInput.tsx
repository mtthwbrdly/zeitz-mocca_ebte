export function CompactPortableTextInput(props: any) {
  return (
    <div className="compact-portable-text-input">
      <style>
        {`
          .compact-portable-text-input [data-testid="pt-editor"] {
            height: 8.5rem;
            min-height: 7rem;
            max-height: 70vh;
            overflow: auto;
            resize: vertical;
          }

          .compact-portable-text-input [data-testid="pt-editor"][data-fullscreen="true"] {
            height: auto;
            max-height: none;
            resize: none;
          }
        `}
      </style>
      {props.renderDefault(props)}
    </div>
  );
}
