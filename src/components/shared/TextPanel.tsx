interface TextPanelProps {
  header?: any;
  text?: any;
  list?: string[];
  alignHeader?: "left" | "center" | "right";
  alignText?: "left" | "center" | "right";
}

export default function TextPanel({
  header,
  text,
  list,
  alignHeader = "center",
  alignText = "center"
}: TextPanelProps) {
  const alignmentheaderClass = `text-${alignHeader}`;
  const alignmentClass = `text-${alignText}`;
  return (
    <div>
      {header && (
        <h1
          className={`${alignmentheaderClass} text-4xl font-semibold text-default-800`}
        >
          {header}
        </h1>
      )}
      {list && (
        <ul className="list-disc px-6 mt-6">
          {list?.map((item, index) => (
            <li className="mb-4 text-default-800" key={index}>
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className={`${alignmentClass}`}>{text}</div>
    </div>
  );
}
