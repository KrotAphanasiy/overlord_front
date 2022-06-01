import {Box, Link as MaterialLink, Typography} from "@material-ui/core";
import { DataTable, Copy } from "features/misc";
import { Visit } from "../types";
import { getVisitData } from "../utils";
import {imageSource} from "../../../utils";

type VisitDetailsProps = {
  visit: Visit;
};

export default function VisitDetails({ visit }: any) {
  return (
    <>
      <Typography variant="overline">
        <Copy text={visit.id.toString()} />
      </Typography>
      <DataTable data={getVisitData(visit)} />
      <Box paddingTop={1.5}>
          <MaterialLink href={imageSource(visit.fullImageLink)} target="_blank">
              Открыть исходную картику
          </MaterialLink>
      </Box>
    </>
  );
}
