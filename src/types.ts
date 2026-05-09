export interface Raffle {
  id: string;
  name: string;
  ownerId: string;
  createdAt: any;
}

export interface Ticket {
  id: string;
  buyerName: string;
  numbers: string;
  createdAt: any;
}
