declare namespace Express {
  export interface Request {
    user?: any;
    tokenNeedsRefresh?: boolean;
  }
}
