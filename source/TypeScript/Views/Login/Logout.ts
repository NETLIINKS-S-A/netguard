// @filename: Logout.ts
//
import { Modal } from '../../Classes.js';
import { FNPHTMLElement } from '../../Types/FunctionParameterTypes.js';
import { checkTokenValidation } from './TokenValidator.js';

export function openLogout(id: FNPHTMLElement) {
    const show: Modal = new Modal(id);
    show.open();
}

export function logout() {
    localStorage.removeItem('accessToken');
    checkTokenValidation();
    window.location.reload();
}

export function dismissLogout(id: any) {
    const close: Modal = new Modal(id);
    close.close();
}
