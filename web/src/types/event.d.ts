export interface events {
  date: string;
  eventImage: string;
  eventName: string;
  id: int;
  price: int;
  totalSingleEventRevenue: int;
  totalTicketSold: int;
}

export interface transactions {
  name: string;
  amount: number;
  date: Date;
  event: string;
}
