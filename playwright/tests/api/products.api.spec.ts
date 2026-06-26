import { expect } from '@playwright/test'
import { test } from '../../fixtures'

test.describe('Products API', () => {
  test('GET /api/productsList returns 200 with a non-empty product list', async ({ apiClient }) => {
    const body = await apiClient.getProducts()

    expect(body.responseCode).toBe(200)
    expect(Array.isArray(body.products)).toBe(true)
    expect(body.products.length).toBeGreaterThan(0)

    const first = body.products[0]
    expect(first).toHaveProperty('id')
    expect(first).toHaveProperty('name')
    expect(first).toHaveProperty('price')
  })

  test('POST /api/productsList returns 405 — method not supported', async ({ apiClient }) => {
    const body = await apiClient.postProducts()

    expect(body.responseCode).toBe(405)
    expect(body.message).toBe('This request method is not supported.')
  })
})
