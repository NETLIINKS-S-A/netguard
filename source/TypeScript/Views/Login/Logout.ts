// @filename: logout.ts
import { Modal } from '../../Classes.js';
import { FNPHTMLElement } from '../../Types/FunctionParameterTypes.js';
import { checkTokenValidation } from './TokenValidator.js';

export function openLogOut(id: FNPHTMLElement) {
    const show: Modal = new Modal(id);
    show.open();
}

export function logOut() {
    localStorage.removeItem('accessToken');
    checkTokenValidation();
    window.location.reload();
}

export function dismissLogOut(id: any) {
    const close: Modal = new Modal(id);
    close.close();
}
