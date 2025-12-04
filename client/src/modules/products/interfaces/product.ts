export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
}

export interface ProductDTO {
  id: number
  name: string
  description: string
  price: number
  stock: number
}

export interface ProductRequest {
  name: string
  price: number
  stock: number
  description: string
}

export const fromBackendToFrontend = (product: ProductDTO): Product => {
  return {
    description: product.description,
    id: Number(product.id),
    name: product.name,
    price: Number(product.price),
    stock: Number(product.stock),
  }
}

export const fromFrontendToBackend = (product: Product): ProductDTO => {
  return {
    description: product.description,
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
  }
}
