import api from '@/api'
import type { Product, ProductDTO } from '../interfaces/product'
import { fromBackendToFrontend } from '../interfaces/product'

export const getProducts = async () => {
  const { data } = await api.get('/api/products')
  const products = data.products as ProductDTO[]
  return products.map((product): Product => {
    return fromBackendToFrontend(product)
  })
}
