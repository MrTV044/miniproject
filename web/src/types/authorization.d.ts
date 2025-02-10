export interface SignUp1 {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  referral?: string;
}

export interface Login1 {
  email: string;
  password: string;
}
