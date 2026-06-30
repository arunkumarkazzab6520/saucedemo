const { test, expect } = require('@playwright/test')

const base_url = 'https://reqres.in'
const api_headers = { 'x-api-key': 'reqres-free-v1' }

test.describe('Reqres API tests', () => {
  let request

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
      baseURL: base_url,
      extraHTTPHeaders: api_headers,
    })
  })

  test.afterAll(async () => {
    await request.dispose()
  })

  test('get', async () => {
    const response = await request.get('/api/users?page=2')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(Array.isArray(body.data)).toBe(true)
    expect(body.data.length).toBeGreaterThan(0)

    for (const user of body.data) {
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('email')
      expect(user).toHaveProperty('first_name')
      expect(user).toHaveProperty('last_name')

      expect(typeof user.id).toBe('number')
      expect(typeof user.email).toBe('string')
      expect(typeof user.first_name).toBe('string')
      expect(typeof user.last_name).toBe('string')
    }
  })

  test('post', async () => {
    const payload = { name: 'morpheus', job: 'leader' }
    const response = await request.post('/api/users', { data: payload })
    expect(response.status()).toBe(201)
    const body = await response.json()
    expect(body.name).toBe(payload.name)
    expect(body.job).toBe(payload.job)
    expect(body).toHaveProperty('id')
    expect(body).toHaveProperty('createdAt')
    expect(new Date(body.createdAt).toString()).not.toBe('Invalid Date')
  })

  test('Bonus: chained create-then-verify flow', async () => {
    const payload = { name: 'trinity', job: 'hacker' }
    const createRes = await request.post('/api/users', { data: payload })
    expect(createRes.status()).toBe(201)
    const created = await createRes.json()

    const createdId = created.id
    expect(createdId).toBeTruthy()
    expect(created.name).toBe(payload.name)
    expect(created.job).toBe(payload.job)
    expect(created).toHaveProperty('createdAt')
  })
})
