export interface IRateLimitError {
  status: number;
  data: {
    message: string;
    timeRemain: number;
    redirect?: string;
  };
}
