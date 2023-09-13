export function calculateStartDate(endDate: string) {
  const endDateParts = endDate.split('-').map(Number);
  const startDate = new Date(
    endDateParts[0] - 1,
    endDateParts[1] - 1,
    endDateParts[2]
  );
  return startDate.toISOString().split('T')[0];
}

