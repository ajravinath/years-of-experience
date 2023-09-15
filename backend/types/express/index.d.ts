export type TokenData = {
  email: string;
  id: string;
};

declare global {
  declare namespace Express {
    export interface Request {
      user?: TokenData;
    }
  }
}
