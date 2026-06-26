import type { APIRequestContext } from '@playwright/test'
import type { AEResponse, BrandsResponse, ProductsResponse } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// AEClient — typed wrapper for the automationexercise.com REST API
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://automationexercise.com'

export class AEClient {
  constructor(private readonly request: APIRequestContext) {}

  // ── Products ────────────────────────────────────────────────────────────────

  async getProducts(): Promise<ProductsResponse> {
    const res = await this.request.get(`${BASE_URL}/api/productsList`)
    return res.json() as Promise<ProductsResponse>
  }

  async postProducts(): Promise<AEResponse> {
    const res = await this.request.post(`${BASE_URL}/api/productsList`)
    return res.json() as Promise<AEResponse>
  }

  async searchProducts(searchTerm: string): Promise<ProductsResponse> {
    const res = await this.request.post(`${BASE_URL}/api/searchProduct`, {
      form: { search_product: searchTerm },
    })
    return res.json() as Promise<ProductsResponse>
  }

  // ── Brands ──────────────────────────────────────────────────────────────────

  async getBrands(): Promise<BrandsResponse> {
    const res = await this.request.get(`${BASE_URL}/api/brandsList`)
    return res.json() as Promise<BrandsResponse>
  }
}
