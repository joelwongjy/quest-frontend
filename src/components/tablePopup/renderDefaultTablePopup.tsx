import React from 'react';
import { GridCellParams } from '@material-ui/data-grid';

import TablePopup from 'components/tablePopup';

const renderDefaultTablePopup = (
  params: GridCellParams
): React.ReactElement => {
  return (
    <TablePopup
      value={params.value ? params.value.toString() : ''}
      width={params.colDef.width}
    />
  );
};

export default renderDefaultTablePopup;
