import { test, expect } from '@playwright/test';
import { Navbar } from '../pages/Navbar';
import { LoginModal } from '../pages/LoginModal';
import { CookieBanner } from '../pages/CookieBanner';
import { UiAlert } from '../pages/UiAlert';

test.describe('Login functionality', () => {
    let navbar: Navbar;
    let loginModal: LoginModal;
    let cookieBanner: CookieBanner;
    let uiAlert: UiAlert;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        // Initialize objects
        navbar = new Navbar(page);
        loginModal = new LoginModal(page);
        cookieBanner = new CookieBanner(page);
        uiAlert = new UiAlert(page);

        // If the cookie banner is visible, accept it
        if (await cookieBanner.isVisible()) {
            await cookieBanner.accept();
        }
    });

    test('should show error alert when login with empty credentials', async () => {
        await navbar.clickAcceder();
        await expect(loginModal.modalLocator).toBeVisible();

        await loginModal.login();

        await expect(uiAlert.alertLocator).toBeVisible();
        expect(await uiAlert.getTitle()).toContain('Login');
        expect(await uiAlert.getMessage()).toContain('Revisa que todos los campos estén rellenos');
        await uiAlert.dismiss();
        await expect(uiAlert.alertLocator).not.toBeVisible();
    });

    test('should show error message when login with invalid credentials', async () => {
        await navbar.clickAcceder();
        await expect(loginModal.modalLocator).toBeVisible();

        await loginModal.enterUsername('usuario_invalido123');
        await loginModal.enterPassword('contraseña_incorrecta123');
        await loginModal.login();

        await expect(uiAlert.alertLocator).toBeVisible();
        expect(await uiAlert.getTitle()).toContain('Error de inicio de sesión');
        expect(await uiAlert.getMessage()).toContain('Por favor, revisa los datos y vuelve a intentarlo. Ten en cuenta el uso de mayúsculas y minúsculas en tu contraseña.');
        await uiAlert.dismiss();
        await expect(uiAlert.alertLocator).not.toBeVisible();
    });

    test('should show error when recovering password with invalid data', async () => {
        await navbar.clickAcceder();
        await expect(loginModal.modalLocator).toBeVisible();

        await loginModal.clickForgotPassword();
        await expect(loginModal.forgotTitleLocator).toBeVisible();
        expect(await loginModal.getForgotTitle()).toContain('Recordar contraseña');

        await loginModal.enterUsername('a');
        await loginModal.enterCaptcha('2');
        await loginModal.submitForgotPassword();

        await expect(uiAlert.alertLocator).toBeVisible();
        expect(await uiAlert.getTitle()).toContain('Error');
        expect(await uiAlert.getMessage()).toContain('Suma incorrecta, inténtelo de nuevo.');
    });

    test('should redirect to remember password when clicking on change password on alert', async () => {
        await navbar.clickAcceder();
        await expect(loginModal.modalLocator).toBeVisible();

        await loginModal.enterUsername('2');
        await loginModal.enterPassword('2');
        await loginModal.login();

        await expect(uiAlert.alertLocator).toBeVisible();
        expect(await uiAlert.getTitle()).toContain('Error de inicio de sesión');

        await uiAlert.clickForgotPassword();
        await expect(loginModal.forgotTitleLocator).toBeVisible();
    });

    test('should change password with valid data', async () => {
        await navbar.clickAcceder();
        await expect(loginModal.modalLocator).toBeVisible();

        await loginModal.enterUsername('admin');
        await loginModal.enterPassword('admin');
        await loginModal.login();

        await expect(uiAlert.alertLocator).toBeVisible();
        expect(await uiAlert.getTitle()).toContain('Cambiar contraseña');
        expect(await uiAlert.getMessage()).toContain('Por razones de seguridad por favor, cambia tu contraseña para poder acceder.');

        await uiAlert.clickChangePassword();
        await expect(loginModal.forgotTitleLocator).toBeVisible();
        expect(await loginModal.getForgotTitle()).toContain('Recordar contraseña');
    });
});
