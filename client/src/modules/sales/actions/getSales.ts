import api from '@/api'
import { fromBackendToFrontEnd } from '../interfaces/serialize'
import type { SaleDTO } from '../interfaces/sale'

export const getSales = async () => {
  const { data } = await api.get('/api/sales/')
  const sales: SaleDTO[] = data.sales
  const serializedSales = sales.map((sale) => {
    return fromBackendToFrontEnd(sale)
  })
  return {
    ok: true,
    sales: serializedSales,
  }
}
