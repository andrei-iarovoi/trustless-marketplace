export type OrderStatus =
  | "Open"
  | "Accepted"
  | "Funded"
  | "Completed"
  | "Cancelled";

export interface Order {
  id: number;

  description: string;

  amount: number;

  client: string;

  freelancer?: string;

  status: OrderStatus;
}