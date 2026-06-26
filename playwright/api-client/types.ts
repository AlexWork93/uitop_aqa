// ── Response shapes ───────────────────────────────────────────────────────────

export interface AEResponse {
  responseCode: number
  message:      string
}

export interface Product {
  id:       number
  name:     string
  price:    string
  brand:    string
  category: { usertype: { usertype: string }; category: string }
}

export interface ProductsResponse {
  responseCode: number
  products:     Product[]
}

export interface Brand {
  id:    number
  brand: string
}

export interface BrandsResponse {
  responseCode: number
  brands:       Brand[]
}
