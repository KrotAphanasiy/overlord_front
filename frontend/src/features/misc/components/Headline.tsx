import { makeStyles, Typography, TypographyProps } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headline: {
    fontWeight: "bold",
  },
  "1": {
    margin: theme.spacing(3, 0, 1.375, 0),
  },
  "2": {
    margin: theme.spacing(2.25, 0, 1.25, 0),
  },
  "3": {
    margin: theme.spacing(1.5, 0, 1, 0),
  },
}));

type HeadlineProps = {
  text: string;
  level: "1" | "2" | "3";
};
const levelToVariant: Record<string, TypographyProps["variant"]> = {
  1: "h2",
  2: "h4",
  3: "h6",
};

export default function Headline(props: HeadlineProps) {
  const classes = useStyles();
  const { level, text } = props;

  return (
    <Typography
      variant={levelToVariant[level]}
      className={`${classes.headline} ${classes[level]}`}
    >
      {text}
    </Typography>
  );
}
