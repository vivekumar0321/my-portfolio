let deferredInstallPrompt = null;

const INSTALL_AVAILABLE_EVENT = 'pwa:install-available';
const APP_INSTALLED_EVENT = 'pwa:installed';

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();

        deferredInstallPrompt = event;

        window.dispatchEvent(
            new CustomEvent(INSTALL_AVAILABLE_EVENT),
        );
    });

    window.addEventListener('appinstalled', () => {
        deferredInstallPrompt = null;

        window.dispatchEvent(
            new CustomEvent(APP_INSTALLED_EVENT),
        );
    });
}

export const getDeferredInstallPrompt = () => {
    return deferredInstallPrompt;
};

export const clearDeferredInstallPrompt = () => {
    deferredInstallPrompt = null;
};

export {
    INSTALL_AVAILABLE_EVENT,
    APP_INSTALLED_EVENT,
};