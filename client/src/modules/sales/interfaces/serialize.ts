import type { Sale, SaleDTO } from './sale'

export const fromBackendToFrontEnd = (sale: SaleDTO): Sale => {
  return {
    id: Number(sale.id),
    total: Number(sale.total),
    createdAt: new Date(sale.created_at),
    paymentMethod: sale.payment_method,
    userId: Number(sale.user_id),
  }
}

export const fromFrontendToBackend = (sale: Sale): SaleDTO => {
  return {
    id: sale.id,
    total: sale.total,
    created_at: sale.createdAt,
    payment_method: sale.paymentMethod,
    user_id: sale.userId,
  }
}
