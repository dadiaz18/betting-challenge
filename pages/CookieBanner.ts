import { Page, Locator } from '@playwright/test';

export class CookieBanner {
  private banner: Locator;
  private acceptButton: Locator;
  private rejectButton: Locator;
  private configButton: Locator;
  private message: Locator;

  constructor(private page: Page) {
    this.banner = page.locator('ion-alert.alertcookies');
    this.acceptButton = page.locator('button').filter({ hasText: 'Aceptar' });
    this.rejectButton = page.locator('button').filter({ hasText: 'Rechazar' });
    this.configButton = page.locator('button').filter({ hasText: 'Configurar Cookies' });
    this.message = page.locator('.alert-message');
  }

  async isVisible(): Promise<boolean> {
    return await this.banner.isVisible();
  }

  async getMessage(): Promise<string | null> {
    return await this.message.textContent();
  }

  async accept(): Promise<void> {
    if (await this.acceptButton.isVisible()) {
      await this.acceptButton.click();
    }
  }

  async reject(): Promise<void> {
    if (await this.rejectButton.isVisible()) {
      await this.rejectButton.click();
    }
  }

  async openConfig(): Promise<void> {
    if (await this.configButton.isVisible()) {
      await this.configButton.click();
    }
  }
}
