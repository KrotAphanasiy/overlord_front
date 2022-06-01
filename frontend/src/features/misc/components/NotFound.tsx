import { Box, Typography, colors } from "@material-ui/core";

type NotFoundProps = {
  text?: string;
};

export default function NotFound({ text }: NotFoundProps) {
  return (
    <Box marginY={1}>
      <Typography style={{ color: colors.grey["800"] }}>
        {text ?? "Данные не найдены"}
      </Typography>
    </Box>
  );
}
