import { Card, Box, Typography, Button } from "@material-ui/core";
import { Copy, DataTable } from "features/misc";
import { Visit } from "../types";
import { getShortVisitData } from "../utils";

type VisitCardProps = {
  visit: Visit;
  onClickDetails: () => void;
};

export default function VisitCard(props: VisitCardProps) {
  const { visit, onClickDetails } = props;
  return (
    <Card component="article">
      <Box paddingY={2} paddingX={1.5}>
        <Typography variant="overline">
          <Copy text={visit.id.toString()} />
        </Typography>
      </Box>
      <DataTable data={getShortVisitData(visit)} />
      <Box display="flex" justifyContent="flex-end" padding={1.5}>
        <Button onClick={onClickDetails}>Подробнее</Button>
      </Box>
    </Card>
  );
}
