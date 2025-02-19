import { Code } from "@heroui/react";
import { PropsWithChildren } from "react";

export interface MessageProps extends PropsWithChildren {
  message: string;
  color: "success" | "danger";
}

export default function Message(props: MessageProps) {
  return (
    <>
      {props.message && (
        <Code
          style={{ whiteSpace: "unset", wordBreak: "break-word" }}
          color={props.color}
        >
          <span>{props.message}</span>
        </Code>
      )}
    </>
  );
}
