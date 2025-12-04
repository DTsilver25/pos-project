import api from '@/api'
import type { SaleRequest } from '../interfaces/sale.request'

export const createSale = async (data: SaleRequest) => {
  try {
    const response = await api.post('/api/sales/create', {
      userId: data.userId,
      total: data.total,
      paymentMethod: data.paymentMethod,
    })
  } catch (error) {
    return error
  }
}
