import React from 'react';
import PropTypes from 'prop-types';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@material-ui/core';

export const ExportCSV = props => {
  const { csvData, fileName } = props;
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      disabled={props.disabled}
      onClick={() => exportToCSV(csvData, fileName)}
      style={{ background: '#fa7816', color: 'white', margin: '5px 5px' }}
    >
      Export .xlsx
    </Button>
  );
};

ExportCSV.propTypes = {
  csvData: PropTypes.array,
  fileName: PropTypes.string,
  disabled: PropTypes.bool
};
