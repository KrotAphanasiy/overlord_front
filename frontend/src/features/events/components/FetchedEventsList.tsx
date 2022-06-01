import {CardMedia} from "@material-ui/core";
import { CommonResponse } from "types";
import EventDetails from "./EventDetails";
import {DataGrid, GridColDef, GridRowData, GridRowParams, GridRowsProp} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {imageSource} from "../../../utils";
import http from "../../../lib/http";
import {Visit} from "../../visits/types";
import queryString from "query-string";
import {useModals} from "../../modal";
import moment from "moment";

type FetchedEventsListProps = {
  cameraId: string;
  startDate: string;
  endDate: string;
};

const columns: GridColDef[] = [
    { field: 'id', type: 'string', headerName: 'id', width: 300, },
    {
        field: 'plateNumber',
        headerName: 'Номер машины',
        headerAlign: 'center',
        type: 'string',
        width: 200,
        align: 'center',
        editable: false,
    },
    {
        field: 'processedImageLink',
        headerName: 'Изображение',
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => {
            return <CardMedia
                style={{
                    height: 32,
                    width: 150,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                }}
                image={imageSource(params.value as string)}
            />
        },
        width: 200

    },
    {
        field: 'timestamp',
        headerName: 'Время',
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
        field: 'cameraRegionName',
        headerName: 'Название региона',
        headerAlign: 'center',
        type: 'string',
        width: 300,
        align: 'center',
        editable: false,
    },
];


function loadServerRows(cameraId: string, pageNumber: number, pageSize: number,
                        startDate: string, endDate: string): Promise<any> {
    return new Promise<any>((resolve) => {
        let url = ``

        if (startDate === null) {
            url = `RecognitionEvent/camera_events?pageNumber=${pageNumber + 1}&pageSize=${pageSize}&cameraUid=${cameraId}&endedAt=${endDate}`
        } else if (endDate === null) {
            url = `RecognitionEvent/camera_events?pageNumber=${pageNumber + 1}&pageSize=${pageSize}&cameraUid=${cameraId}&startedAt=${startDate}`
        } else {
            url = `RecognitionEvent/camera_events?pageNumber=${pageNumber + 1}&pageSize=${pageSize}&cameraUid=${cameraId}&startedAt=${startDate}&endedAt=${endDate}`
        }

        resolve(http.get<CommonResponse<Visit[]>>(url).then((res) => res.data))
    });
}

export default function FetchedEventsList(props: FetchedEventsListProps) {
  const [pageNumber, setPage] = useState(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [rows, setRows] = useState<GridRowsProp>([])
  const [rowsCount, setRowsCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const { cameraId, startDate, endDate } = props;
  const [openModal] = useModals();


  const handleOnRowClick = (params: GridRowParams) => {
    openModal({
        title: "Информация о снимке",
        content: <EventDetails event={params.row}/>
    });
  }

  useEffect(() => {
      let active = true;
      (async () => {
          setLoading(true);
          const response = await loadServerRows(cameraId, pageNumber, pageSize, startDate, endDate);
          const newRows = response.data;
          setRowsCount(response.total);

          if(!active) {
              return;
          }

          setRows(newRows);
          setLoading(false);
      })();

      return () => {
          active = false;
      };
  }, [pageNumber, pageSize, cameraId, startDate, endDate]);


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
              rowCount={rowsCount}
              onPageChange={(newPage) => setPage(newPage)}

              loading={loading}
              disableSelectionOnClick

              onRowClick={(row) => handleOnRowClick(row)}
              disableColumnSelector
          />
      </div>
  );
}
