import { Page, Locator } from '@playwright/test';

export class Navbar {
  private loginButton: Locator;
  private registerButton: Locator;

  constructor(private page: Page) {
    this.loginButton = page.locator('button').filter({ hasText: 'Acceder' });
    this.registerButton = page.locator('button').filter({ hasText: 'Regístrate' });
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }
}
