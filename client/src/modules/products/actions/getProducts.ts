import api from '@/api'

export const getProducts = async () => {
  const { data } = await api.get('/api/products')
  return data.products
}
