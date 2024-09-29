export const GetPeriodOfMonth = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setDate(1);
  end.setDate(31);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
};
