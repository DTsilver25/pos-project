export interface SaleRequest {
  userId: number
  total: number
  paymentMethod: 'cash' | 'credit'
}
