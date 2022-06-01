import { GasStation } from "features/stations";
import { CommonResponse } from "types";
import { Visit } from "../types";
import VisitDetails from "./VisitDetails";
import {DataGrid, GridColDef, GridRowParams, GridRowsProp} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import http from "../../../lib/http";
import {useModals} from "../../modal";
import moment from "moment";
import {Button} from "@material-ui/core";

type FetchedVisitsListProps = {
  gasStationId: GasStation["id"];
  startDate: string;
  endDate: string;
};

const columns: GridColDef[] = [
    { field: 'id', type: 'number', headerName: 'ID', width: 90, },
    {
        field: 'plateNumber',
        headerName: 'Номер машины',
        headerAlign: 'center',
        type: 'string',
        align: 'center',
        width: 200,
        editable: false,
    },
    {
        field: 'start',
        headerName: 'Начало',
        headerAlign: 'center',
        type: 'string',
        valueGetter: params => {
            return params.value && moment.utc(params.value.toString()).local().locale('ru').format('LLL LTS')
        },
        width: 200,
        align: 'right',
        editable: false,
    },
    {
        field: 'end',
        headerName: 'Конец',
        headerAlign: 'center',
        type:'string',
        valueGetter: params => {
            return params.value && moment.utc(params.value.toString()).local().locale('ru').format('LLL LTS')
        },
        width: 200,
        editable: false,
    },
    {
        field: 'gasStationName',
        headerName: 'Название станции',
        headerAlign: 'center',
        type: 'string',
        align: 'center',
        width: 200,
    },
    {
        field: 'eventsCount',
        headerName: 'Количество снимков',
        headerAlign: 'center',
        type: 'number',
        align: 'center',
        width: 250,
    },
];


function loadServerRows(gasStationId: number, pageNumber: number, pageSize: number,
                        startDate: string, endDate: string): Promise<any> {
    return new Promise<any>((resolve) => {
        let url = ``
        if (startDate === null){
            url = `Visits/station/${gasStationId}?pageSize=${pageSize}&pageNumber=${pageNumber + 1}&endDate=${endDate}`
        } else if (endDate === null){
            url = `Visits/station/${gasStationId}?pageSize=${pageSize}&pageNumber=${pageNumber + 1}&startDate=${startDate}`
        } else {
            url = `Visits/station/${gasStationId}?pageSize=${pageSize}&pageNumber=${pageNumber + 1}&startDate=${startDate}&endDate=${endDate}`
        }
        resolve(http.get<CommonResponse<Visit[]>>(url)
            .then((res) => res.data))
    });
}

export default function FetchedVisitsList({
  gasStationId, startDate, endDate
}: FetchedVisitsListProps) {

  const [pageNumber, setPage] = useState(0)
  const [rows, setRows] = useState<GridRowsProp>([])
  const [rowCount, setRowCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(10)

  const [openModal] = useModals();

  const handleOnRowClick = (params: GridRowParams) => {
    openModal({
        title: "Информация о визите",
        content: <VisitDetails visit={params.row}/>
    });
  }

  useEffect(() => {
      let active = true;
      (async () => {
          setLoading(true);
          const response = await loadServerRows(gasStationId, pageNumber, pageSize, startDate, endDate)

          const newRows = response.data;
          setRowCount(response.total);

          if(!active) {
              return;
          }

          setRows(newRows);
          setLoading(false);
      })();

    return () => {
        active = false;
    };
  }, [pageNumber, pageSize, gasStationId, startDate, endDate]);

  return (
    <div style={{ height: 630, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}

            pagination
            paginationMode='server'
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10,30,100]}
            rowCount={rowCount}
            onPageChange={(newPage) => setPage(newPage)}

            loading={loading}
            disableSelectionOnClick

            onRowClick={(rowParam) => {
                return handleOnRowClick(rowParam)}
            }
            disableColumnSelector

        />
    </div>
  );
}
