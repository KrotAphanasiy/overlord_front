import { Box, Container } from "@material-ui/core";
import { Headline } from "features/misc";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children?: ReactNode;
  title: string;
};

export default function AuthLayout(props: AuthLayoutProps) {
  const { children, title } = props;

  return (
    <Box
      width="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Container maxWidth="xs">
        <Headline level="1" text={title} />
        {children}
      </Container>
    </Box>
  );
}
