import { Page, Locator } from '@playwright/test';

export class Navbar {
  private accederButton: Locator;
  private registrarseButton: Locator;

  constructor(private page: Page) {
    this.accederButton = page.locator('button').filter({ hasText: 'Acceder' });
    this.registrarseButton = page.locator('button').filter({ hasText: 'Regístrate' });
  }

  async clickAcceder(): Promise<void> {
    await this.accederButton.click();
  }

  async clickRegistrarse(): Promise<void> {
    await this.registrarseButton.click();
  }
}
