import type { Order } from "@/types/order";

export const mockOrders: Order[] = [
  {
    id: 1,
    title: "Website Development",
    budget: 2.5,
    deadline: "Jul 25",
    buyer: "0x12...8A91",
    status: "Open",
  },
  {
    id: 2,
    title: "Smart Contract Audit",
    budget: 4,
    deadline: "Aug 03",
    buyer: "0x82...FE44",
    seller: "0x31...AB99",
    status: "Accepted",
  },
  {
    id: 3,
    title: "Landing Page UI",
    budget: 1.2,
    deadline: "Jul 30",
    buyer: "0x55...CC11",
    seller: "0x71...AF81",
    status: "Funded",
  },
];