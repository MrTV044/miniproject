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

export interface singleEvent {
  id: number;
  name: string;
  genre: string;
  date: string;
  place: string;
  description: string;
  image: string;
  ticketSlot: number;
  ticketSold: number;
  prices: number[];
  eventType: string;
  organizerId: number;
  Organizer: {
    id: number;
    fullname: string;
    email: string;
    role: "ORGANIZER";
    created_at: string;
  };
  Order: Order[];
}

interface Order {
  id: number;
  totalPrice: number;
  totalTicket: number;
  userId: number;
  eventId: number;
  createdAt: string;
}

type Timeframe = "daily" | "monthly" | "yearly";
