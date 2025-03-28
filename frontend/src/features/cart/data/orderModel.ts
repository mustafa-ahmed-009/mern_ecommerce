import { CartItem } from "./CartModel"

export interface OrderModel {
    customerName: string
    cartItems: CartItem[]
    totalAmount: number
    status: string
    shippingAddress: ShippingAddress
    shippingCost: number
    _id?: string
    createdAt?: string
    updatedAt?: string
    __v?: number
  }
  

  
  export interface ShippingAddress {
    country: string
    governorate: string
    street: string
    phone: string
    postalCode: string
    details: string
  }
  