import XLSX from 'xlsx';

export interface ExcelData {
  rows: unknown[];
  cols: {
    name: string;
    key: number;
  }[];
}

function makeCols(refstr: string): { name: string; key: number }[] {
  const o = [];
  const C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (let i = 0; i < C; i += 1) {
    o[i] = { name: XLSX.utils.encode_col(i), key: i };
  }
  return o;
}

export const excelRenderer = (
  file: Blob,
  callback: (err: Error | null, data: ExcelData | null) => void
): Promise<ExcelData> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (event) => {
      /* Parse data */
      const bstr = event?.target?.result;
      if (!bstr) {
        callback(
          new Error('Failed to read file - no target result found.'),
          null
        );
        return;
      }
      const wb: XLSX.WorkBook = XLSX.read(bstr, {
        type: rABS ? 'binary' : 'array',
      });

      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      /* Convert array of arrays */
      const json = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (!ws['!ref']) {
        callback(new Error('Failed to get columns of sheet'), null);
        return;
      }
      const cols = makeCols(ws['!ref']);

      const data: ExcelData = { rows: json, cols };

      callback(null, data);
      resolve(data);
    };

    if (file && rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  });
};
