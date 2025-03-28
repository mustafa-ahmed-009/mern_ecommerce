export interface Address {
  country: string
  governorate: string
  street: string
  phone: string
  postalCode: string
  details: string
  _id?: string,
  
}

export type AddressFormValues = Omit<Address, '_id'> & {
  _id?: string // Make _id optional for new addresses
}