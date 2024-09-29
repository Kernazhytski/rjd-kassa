import * as dayjs from 'dayjs';

export const formatDateFromYYYYMMDDtoDDMMYYYY = (
  date?: string | null,
  options?: { includeTime: boolean }
) => {
  let dateCellFormat: string = 'DD-MM-YYYY';

  if (options?.includeTime) {
    dateCellFormat = `${dateCellFormat} HH:mm`;
  }

  return date ? dayjs(date).format(dateCellFormat) : '';
};

export const formatDateToYYYYMMDD = (date?: string | null, options?: { includeTime: boolean }) => {
  let dateCellFormat: string = 'YYYY-MM-DD';

  if (options?.includeTime) {
    dateCellFormat = `${dateCellFormat} HH:mm`;
  }

  return date ? dayjs(date).format(dateCellFormat) : null;
};

export const formatDateToDotDate = (date?: string | null) => {
  const dateCellFormat: string = 'DD.MM.YYYY';

  return date ? dayjs(date).format(dateCellFormat) : null;
};
