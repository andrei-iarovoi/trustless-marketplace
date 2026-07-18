export type OrderStatus =
  | "Open"
  | "Accepted"
  | "Funded"
  | "Completed"
  | "Cancelled";

export interface Order {
  id: number;
  title: string;
  budget: number;
  deadline: string;
  buyer: string;
  seller?: string;
  status: OrderStatus;
}