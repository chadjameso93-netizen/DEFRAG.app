import { expect, test } from "@playwright/test"

test("signup page loads", async ({ page }) => {
  await page.goto("/signup")
  await expect(page.getByRole("heading", { name: /create your account/i })).toBeVisible()
})

test("onboarding submit requires authentication", async ({ request }) => {
  const response = await request.post("/api/onboarding/submit", {
    data: {
      dob: "1990-01-01",
      birth_time: null,
      birth_city: "Boston",
      time_confidence: "unknown",
    },
  })

  expect(response.status()).toBe(401)
  await expect(response.json()).resolves.toMatchObject({
    error: "Unauthorized",
  })
})
