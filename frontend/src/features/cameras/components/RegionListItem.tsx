import { Box, Typography } from "@material-ui/core";
import { DataTable } from "features/misc";
import { Region } from "../types";
import { getShortRegionData } from "../utils";

type RegionListItemProps = {
  region: Region;
};

export default function RegionListItem({ region }: RegionListItemProps) {
  return (
    <Box component="li" paddingBottom={1.5}>
      <Typography variant="subtitle2" gutterBottom>
        Регион {region.id}
      </Typography>
      <DataTable data={getShortRegionData(region)} />
    </Box>
  );
}
