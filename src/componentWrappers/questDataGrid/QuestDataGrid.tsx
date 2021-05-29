import React from 'react';
import { DataGrid, DataGridProps } from '@material-ui/data-grid';

const QuestDataGrid: React.FunctionComponent<DataGridProps> = (props) => {
  return (
    <DataGrid
      pageSize={20}
      autoHeight
      checkboxSelection
      disableSelectionOnClick
      {...props}
    />
  );
};

export default QuestDataGrid;
