import { createContext, useContext, useState, type ReactNode } from 'react';

export type OrderStatus = 'nouvelle' | 'en-cours' | 'prete' | 'servie';

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  table: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  covers: number;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (table: string, items: OrderItem[], total: number) => string;
  updateStatus: (id: string, status: OrderStatus) => void;
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getOrderByTable: (table: string) => Order | undefined;
  currentClientOrder: Order | null;
}

const OrderContext = createContext<OrderContextType | null>(null);

function loadOrders(): Order[] {
  const saved = localStorage.getItem('elite_orders');
  return saved ? JSON.parse(saved) : [];
}

function saveOrders(orders: Order[]) {
  localStorage.setItem('elite_orders', JSON.stringify(orders));
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(
    () => localStorage.getItem('elite_current_order')
  );

  const createOrder = (table: string, items: OrderItem[], total: number): string => {
    const id = `EL-${Date.now().toString(36).toUpperCase()}`;
    const order: Order = {
      id,
      table,
      items,
      total,
      status: 'nouvelle',
      createdAt: Date.now(),
      covers: items.reduce((s, i) => s + i.qty, 0),
    };
    const updated = [...orders, order];
    setOrders(updated);
    saveOrders(updated);
    setCurrentOrderId(id);
    localStorage.setItem('elite_current_order', id);
    return id;
  };

  const updateStatus = (id: string, status: OrderStatus) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    saveOrders(updated);
  };

  const getOrdersByStatus = (status: OrderStatus) => orders.filter(o => o.status === status);

  const getOrderByTable = (table: string) => orders.find(o => o.table === table && o.status !== 'servie');

  const currentClientOrder = orders.find(o => o.id === currentOrderId) || null;

  return (
    <OrderContext.Provider value={{ orders, createOrder, updateStatus, getOrdersByStatus, getOrderByTable, currentClientOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
}
