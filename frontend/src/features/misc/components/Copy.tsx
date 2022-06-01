import { ButtonBase } from "@material-ui/core";
import { copy } from "utils";

type CopyProps = {
  text: string;
};

export default function Copy({ text }: CopyProps) {
  return (
    <ButtonBase
      style={{
        fontWeight: "inherit",
        fontSize: "inherit",
        fontFamily: "inherit",
        color: "inherit",
        lineHeight: "inherit",
        letterSpacing: "inherit",
        textTransform: "inherit",
      }}
      onClick={() => copy(text)}
    >
      {text}
    </ButtonBase>
  );
}
