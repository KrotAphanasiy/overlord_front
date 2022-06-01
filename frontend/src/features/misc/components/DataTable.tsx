import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CardMedia
} from "@material-ui/core";
import Copy from "./Copy";
import {imageSource} from "../../../utils";

type DataTableProps = {
  data: Record<string, any>;
};

export default function DataTable({ data }: DataTableProps) {
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          {Object.entries(data).map(([title, value]) => {
                if (["string", "number", "boolean"].includes(typeof value)) return  (
                    <TableRow key={title}>
                      <TableCell component="th" scope="row">
                        {title}
                      </TableCell>
                      <TableCell align="right">
                        <Copy text={value.toString()}/>
                      </TableCell>
                    </TableRow>
                ); else return null
              }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
