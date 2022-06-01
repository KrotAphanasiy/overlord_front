import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import {
  Link as MaterialLink,
  LinkProps as MaterialLinkProps,
} from "@material-ui/core";

type LinkProps = RouterLinkProps & MaterialLinkProps & { asLink?: boolean };

export default function Link(props: LinkProps) {
  const { asLink = false } = props;
  return (
    <MaterialLink
      component={RouterLink}
      {...props}
      {...(asLink
        ? { underline: "hover" }
        : { color: "inherit", underline: "none" })}
    />
  );
}
