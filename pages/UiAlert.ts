import { Page, Locator } from '@playwright/test';

export class UiAlert {
  private alert: Locator;
  private alertTitle: Locator;
  private alertMessage: Locator;
  private alertOkButton: Locator;
  private alertForgotPasswordButton: Locator;
  private alertChangePasswordButton: Locator;

  constructor(private page: Page) {
    this.alert = page.locator('ion-alert[role="alertdialog"]');
    this.alertTitle = page.locator('.alert-head');
    this.alertMessage = page.locator('.alert-message');
    this.alertOkButton = page.getByRole('button', { name: 'OK' });
    this.alertForgotPasswordButton = page.getByRole('button', { name: /¿olvidó su contraseña\?/i });
    this.alertChangePasswordButton = page.getByRole('button', { name: 'Cambiar contraseña' });
  }

  get alertLocator(): Locator {
    return this.alert;
  }

  async getTitle(): Promise<string | null> {
    return await this.alertTitle.textContent();
  }

  async getMessage(): Promise<string | null> {
    return await this.alertMessage.textContent();
  }

  async dismiss(): Promise<void> {
    await this.alertOkButton.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.alertForgotPasswordButton.click();
  }

  async clickChangePassword(): Promise<void> {
    await this.alertChangePasswordButton.click();
  }
}
