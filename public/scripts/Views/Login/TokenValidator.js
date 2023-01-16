// @filename: TokenValidator.ts
import { UI } from '../../Libs/lib.dom.js';
import { applicationView } from '../ApplicationUI/ApplicationView.js';
export function checkTokenValidation() {
    const AccessToken = UI.accessToken;
    const app = UI.App.app;
    const login = UI.Login?.login;
    if (!AccessToken)
        app.style.display = 'none';
    else if (AccessToken === 'undefined')
        console.error('Error: access token is undefined');
    else if (AccessToken == null)
        console.error('Error: access token is null');
    else
        (app.style.display = 'block'),
            (login.style.display = 'none'),
            applicationView();
}
