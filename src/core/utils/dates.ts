// Convert seconds to format mm:ss
export default function formatSeconds(seconds: number) {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
}

// Get seconds diff between two dates
export function getSecondsDiff(startDate: Date, endDate: Date) {
  const msInSecond = 1000;

  return Math.round(
    Math.abs(endDate.getTime() - startDate.getTime()) / msInSecond
  );
}
