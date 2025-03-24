export interface Product {
    title: string
    slug: string
    description: string
    quantity: number
    sold: number
    price: number
    priceAfterDiscount: number
    colors: any[]
    imageCover: string
    images: string[]
    category: {
      name: string;  // Ensure category is an object
    };
    subcategories: any[]
    ratingsQuantity: number
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
    id: string
  }
  