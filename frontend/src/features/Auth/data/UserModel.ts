import { Address } from "../../data/AdressModel";

export interface UserModel {
  name: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  wishlist: any[];
  _id: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
