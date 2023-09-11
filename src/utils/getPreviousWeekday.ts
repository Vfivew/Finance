export function getPreviousWeekday(): string {
  const result = new Date();
  
  if (result.getDay() === 0) {
    result.setDate(result.getDate() - 2);
  }
  else if 
    (result.getDay() === 1) {
    result.setDate(result.getDate() - 3);
  }
  else
    result.setDate(result.getDate() - 1);
  
  return result.toISOString().split('T')[0];
}