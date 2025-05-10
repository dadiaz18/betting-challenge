import { Page, Locator } from '@playwright/test';

export class LoginModal {
  // for login purpose
  private modal: Locator;
  private closeButton: Locator;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private forgotPasswordButton: Locator;
  private registerButton: Locator;

  // for forgot password
  private forgotTitle: Locator;
  private forgotSubmitButton: Locator;
  private captchaInput: Locator;

  //alert selectors
  private alertTitle: Locator;
  private alertMessage: Locator;
  private alertOkButton: Locator;
  private alert: Locator;
  private alertForgotPasswordButton: Locator;
  private alertChangePasswordButton: Locator;

  constructor(private page: Page) {

    // for login purpose
    this.modal = page.locator('ion-modal.show-modal');
    this.closeButton = page.locator('.closeModal');
    this.usernameInput = page.getByRole('textbox', { name: 'Usuario / Correo electrónico' });
    this.passwordInput = page.getByRole('textbox', { name: 'Contraseña' })
    this.loginButton = page.getByRole('button', { name: /acceder/i });
    this.forgotPasswordButton = page.getByRole('button', { name: /¿olvidaste tu contraseña\?/i });
    this.registerButton = page.getByRole('button', { name: /regístrate/i });

    // forgot purposes
    this.forgotTitle = page.locator('div.contactTitle');
    this.forgotSubmitButton = page.getByRole('button', { name: 'Enviar' });
    this.captchaInput = page.getByRole('textbox', { name: 'Introduce el resultado' });

    //alert selectors
    this.alert = page.locator('ion-alert[role="alertdialog"]');
    this.alertTitle = page.locator('.alert-head');
    this.alertMessage = page.locator('.alert-message');
    this.alertOkButton = page.getByRole('button', { name: 'OK' });
    this.alertForgotPasswordButton = page.getByRole('button', { name: /¿olvidó su contraseña\?/i });
    this.alertChangePasswordButton = page.getByRole('button', { name: 'Cambiar contraseña' });

  }

  // for login purpose
  get modalLocator(): Locator {
    return this.modal;
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async login(): Promise<void> {
    await this.loginButton.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordButton.click();
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }

  // for forgot password
  get forgotTitleLocator(): Locator {
    return this.forgotTitle;
  }

  async getForgotTitle(): Promise<string | null> {
    return await this.forgotTitle.textContent();
  }

  async submitForgotPassword(): Promise<void> {
    await this.forgotSubmitButton.click();
  }

  async enterCaptcha(captcha: string): Promise<void> {
    await this.captchaInput.fill(captcha);
  }

  //alert methods
  get alertLocator(): Locator {
    return this.alert;
  }

  async getAlertText(): Promise<string | null> {
    return await this.alertMessage.textContent();
  }

  async dismissAlert(): Promise<void> {
    await this.alertOkButton.click();
  }

  async clickAlertForgotPassword(): Promise<void> {
    await this.alertForgotPasswordButton.click();
  }

  async getAlertTitle(): Promise<string | null> {
    return await this.alertTitle.textContent();
  }

  async clickAlertChangePassword(): Promise<void> {
    await this.alertChangePasswordButton.click();
  }

}
