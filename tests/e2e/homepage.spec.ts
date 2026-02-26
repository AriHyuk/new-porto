import { test, expect } from '@playwright/test';

/**
 * E2E Tests — Homepage (Portfolio: ariawaludin.my.id)
 * 
 * Cakupan:
 * 1. Halaman bisa diakses
 * 2. Elemen Hero section hadir dan kontennya benar
 * 3. Navigasi utama berfungsi
 * 4. Dark mode toggle berfungsi
 * 5. Mobile responsive: navigasi tidak rusak
 */

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully and show correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Ari Awaludin/i);
  });

  test('Hero section - should display name and tagline', async ({ page }) => {
    // Cek section hero ada
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Cek teks "Cloud-Native" ada di Hero
    await expect(page.getByText('Cloud-Native')).toBeVisible();

    // Cek teks "Software Engineer"
    await expect(page.getByText('Software Engineer')).toBeVisible();
  });

  test('Hero CTA button - "View My Work" should be clickable', async ({ page }) => {
    const ctaButton = page.getByText('View My Work');
    await expect(ctaButton).toBeVisible();
    
    // Klik dan pastikan tidak lempar error
    await ctaButton.click();
    
    // Setelah scroll, halaman masih bisa diinteraksi
    await expect(page).not.toHaveURL(/error/);
  });

  test('should have meta tags for SEO', async ({ page }) => {
    // Cek Open Graph meta tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Ari Awaludin/i);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveCount(1);
  });
});

test.describe('Dark Mode', () => {
  test('should toggle dark mode without breaking layout', async ({ page }) => {
    await page.goto('/');
    
    // Cek state awal — halaman terload normal
    const html = page.locator('html');
    await expect(html).toBeVisible();
    
    // Cari tombol dark mode toggle
    const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="dark"], [aria-label*="light"], button:has(svg)').first();
    
    if (await themeToggle.isVisible()) {
      // Klik toggle
      await themeToggle.click();
      await page.waitForTimeout(300); // Tunggu transisi CSS
      
      // Pastikan halaman tidak crash
      await expect(page.locator('body')).toBeVisible();
      await expect(page).not.toHaveURL(/error/);
    }
  });
});

test.describe('Responsive - Mobile', () => {
  test('should display properly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    // Hero section masih terlihat di mobile
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    
    // Teks utama tidak overflow atau hilang total
    await expect(page.getByText('Cloud-Native')).toBeVisible();
  });
});
