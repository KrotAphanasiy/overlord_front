import { Paper, Box, BoxProps } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";

type DisplayErrorProps = {
  message?: string;
} & BoxProps;

export default function DisplayError(props: DisplayErrorProps) {
  const { message, ...boxProps } = props;
  return (
    <Box
      component={Paper}
      padding={1.5}
      marginY={1}
      display="flex"
      alignItems="center"
      {...boxProps}
    >
      <Box marginRight={1} height="24px" width="24px">
        <ErrorOutline color="error" />
      </Box>
      {message ?? "Что-то пошло не так"}
    </Box>
  );
}
