import api from '@/api'
import type { ProductRequest } from '../interfaces/product'

export const createProduct = async (data: ProductRequest) => {
  const product = await api.post('/api/products/create', data)
  console.log(product)
}
