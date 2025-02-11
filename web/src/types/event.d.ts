export interface events {
  name: string;
  date: Date;
  order: string;
}

export interface transactions {
  name: string;
  amount: number;
  date: Date;
  event: string;
}
