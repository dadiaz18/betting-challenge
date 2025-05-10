import { Page, Locator } from '@playwright/test';

export class CookieBanner {
  private banner: Locator;
  private aceptarButton: Locator;
  private rechazarButton: Locator;
  private configurarButton: Locator;
  private message: Locator;

  constructor(private page: Page) {
    this.banner = page.locator('ion-alert.alertcookies');
    this.aceptarButton = page.locator('button').filter({ hasText: 'Aceptar' });
    this.rechazarButton = page.locator('button').filter({ hasText: 'Rechazar' });
    this.configurarButton = page.locator('button').filter({ hasText: 'Configurar Cookies' });
    this.message = page.locator('.alert-message');
  }

  async isVisible(): Promise<boolean> {
    return await this.banner.isVisible();
  }

  async getMessage(): Promise<string | null> {
    return await this.message.textContent();
  }

  async accept(): Promise<void> {
    if (await this.aceptarButton.isVisible()) {
      await this.aceptarButton.click();
    }
  }

  async reject(): Promise<void> {
    if (await this.rechazarButton.isVisible()) {
      await this.rechazarButton.click();
    }
  }

  async openConfig(): Promise<void> {
    if (await this.configurarButton.isVisible()) {
      await this.configurarButton.click();
    }
  }
}
