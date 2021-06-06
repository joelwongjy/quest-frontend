import {
  getGridStringOperators,
  GridCellParams,
  GridColTypeDef,
  GridFilterItem,
} from '@material-ui/data-grid';

import { ProgrammeListData } from 'interfaces/models/programmes';

export const programmeColumnType: GridColTypeDef = {
  filterOperators: getGridStringOperators()
    .filter((operator) => operator.value === 'contains')
    .map((operator) => {
      return {
        ...operator,
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          if (
            !filterItem.columnField ||
            !filterItem.value ||
            !filterItem.operatorValue
          ) {
            return null;
          }

          return (params: GridCellParams): boolean => {
            const programmes = params.value as ProgrammeListData[];
            const names = programmes
              .map((p) => p.name.toLowerCase())
              .join(', ');

            return names
              .toLowerCase()
              .includes(filterItem.value!.toLowerCase());
          };
        },
      };
    }),
};
