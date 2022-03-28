export interface Category {
  iconName: string;
  id: string;
  name: string;
  type: string;
}

export interface Item {
  amount: string;
  category: Category;
  cid: string;
  date: string;
  id: string;
  monthCategory: string;
  timestamp: number;
  title: string;
}