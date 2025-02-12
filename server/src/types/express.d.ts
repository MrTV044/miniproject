import { JwtPayload } from "jsonwebtoken";

interface CustomJWTPayload extends JwtPayload {
  id: number;
  fullname: string;
  email: string;
  password: string;
  role: string;
  referral?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: CustomJWTPayload | null;
    }
  }
}
