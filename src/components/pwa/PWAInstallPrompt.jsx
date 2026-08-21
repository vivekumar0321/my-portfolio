import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    FiDownloadCloud,
    FiPlusSquare,
    FiShare,
    FiSmartphone,
    FiX,
} from 'react-icons/fi';

// import {
//     APP_INSTALLED_EVENT,
//     clearDeferredInstallPrompt,
//     getDeferredInstallPrompt,
//     INSTALL_AVAILABLE_EVENT,
// } from '../../pwa/installPrompt';

import './PWAInstallPrompt.css';
import { APP_INSTALLED_EVENT, clearDeferredInstallPrompt, getDeferredInstallPrompt, INSTALL_AVAILABLE_EVENT } from './installPrompt';

const DISMISSED_AT_KEY = 'pwa_install_prompt_dismissed_at';

const SEVEN_DAYS_IN_MILLISECONDS =
    7 * 24 * 60 * 60 * 1000;

const isRunningAsInstalledApp = () => {
    const isStandaloneDisplayMode = window.matchMedia(
        '(display-mode: standalone)',
    ).matches;

    const isIOSStandalone =
        window.navigator.standalone === true;

    return isStandaloneDisplayMode || isIOSStandalone;
};

const isIOSDevice = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    const isStandardIOSDevice =
        /iphone|ipad|ipod/.test(userAgent);

    const isIPadOSDevice =
        window.navigator.platform === 'MacIntel' &&
        window.navigator.maxTouchPoints > 1;

    return isStandardIOSDevice || isIPadOSDevice;
};

const isDismissCooldownActive = () => {
    const dismissedAt = Number(
        localStorage.getItem(DISMISSED_AT_KEY),
    );

    if (!dismissedAt) {
        return false;
    }

    const elapsedTime = Date.now() - dismissedAt;

    return elapsedTime < SEVEN_DAYS_IN_MILLISECONDS;
};

const saveDismissedTime = () => {
    localStorage.setItem(
        DISMISSED_AT_KEY,
        String(Date.now()),
    );
};

const PWAInstallPrompt = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isInstalling, setIsInstalling] = useState(false);
    const [installError, setInstallError] = useState('');

    const isIOS = useMemo(() => isIOSDevice(), []);

    const closePrompt = useCallback(() => {
        saveDismissedTime();
        setIsVisible(false);
        setInstallError('');
    }, []);

    const showPromptWhenAvailable = useCallback(() => {
        if (isRunningAsInstalledApp()) {
            return;
        }

        if (isDismissCooldownActive()) {
            return;
        }

        const installPrompt =
            getDeferredInstallPrompt();

        if (installPrompt) {
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        if (isRunningAsInstalledApp()) {
            return undefined;
        }

        if (isDismissCooldownActive()) {
            return undefined;
        }

        let iosPromptTimer;

        if (isIOS) {
            iosPromptTimer = window.setTimeout(() => {
                setIsVisible(true);
            }, 1200);
        } else {
            // showPromptWhenAvailable();
        }

        const handleInstallAvailable = () => {
            showPromptWhenAvailable();
        };

        const handleAppInstalled = () => {
            saveDismissedTime();
            setIsVisible(false);
            setInstallError('');
        };

        window.addEventListener(
            INSTALL_AVAILABLE_EVENT,
            handleInstallAvailable,
        );

        window.addEventListener(
            APP_INSTALLED_EVENT,
            handleAppInstalled,
        );

        return () => {
            if (iosPromptTimer) {
                window.clearTimeout(iosPromptTimer);
            }

            window.removeEventListener(
                INSTALL_AVAILABLE_EVENT,
                handleInstallAvailable,
            );

            window.removeEventListener(
                APP_INSTALLED_EVENT,
                handleAppInstalled,
            );
        };
    }, [
        isIOS,
        showPromptWhenAvailable,
    ]);

    useEffect(() => {
        if (!isVisible) {
            return undefined;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = 'hidden';

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                closePrompt();
            }
        };

        window.addEventListener(
            'keydown',
            handleEscapeKey,
        );

        return () => {
            document.body.style.overflow =
                previousOverflow;

            window.removeEventListener(
                'keydown',
                handleEscapeKey,
            );
        };
    }, [
        closePrompt,
        isVisible,
    ]);

    const handleInstall = async () => {
        const installPrompt =
            getDeferredInstallPrompt();

        if (!installPrompt) {
            setInstallError(
                'Install option is not available yet. Please use your browser menu to install the app.',
            );

            return;
        }

        try {
            setIsInstalling(true);
            setInstallError('');

            await installPrompt.prompt();

            const choiceResult =
                await installPrompt.userChoice;

            clearDeferredInstallPrompt();
            saveDismissedTime();
            setIsVisible(false);

            if (choiceResult.outcome === 'accepted') {
                console.info(
                    'PWA installation accepted by the user.',
                );
            } else {
                console.info(
                    'PWA installation dismissed by the user.',
                );
            }
        } catch (error) {
            console.error(
                'Unable to open the PWA install prompt:',
                error,
            );

            setInstallError(
                'Unable to open the install prompt. Please try again from your browser menu.',
            );
        } finally {
            setIsInstalling(false);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <>
            <div
                className="pwa-install-backdrop"
                onClick={closePrompt}
                aria-hidden="true"
            />

            <div
                className="modal show d-block pwa-install-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="pwa-install-title"
                aria-describedby="pwa-install-description"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-body text-body border-0 shadow-lg">
                        <div className="modal-header border-0 pb-0">
                            <div className="pwa-install-icon">
                                <FiSmartphone />
                            </div>

                            <button
                                type="button"
                                className="btn pwa-close-button"
                                onClick={closePrompt}
                                aria-label="Close installation popup"
                            >
                                <FiX />
                            </button>
                        </div>

                        <div className="modal-body px-4 pb-4">
                            <h2
                                id="pwa-install-title"
                                className="h4 fw-bold mb-2"
                            >
                                Install our app
                            </h2>

                            <p
                                id="pwa-install-description"
                                className="text-body-secondary mb-4"
                            >
                                Install this application on your
                                device for faster access, a
                                full-screen experience and
                                improved offline support.
                            </p>

                            {isIOS ? (
                                <div className="pwa-ios-instructions">
                                    <div className="pwa-instruction-item">
                                        <span className="pwa-instruction-number">
                                            1
                                        </span>

                                        <div>
                                            <strong>
                                                Open the Share menu
                                            </strong>

                                            <p className="mb-0 text-body-secondary small">
                                                Tap the{' '}
                                                <FiShare className="mx-1" />
                                                Share icon in your
                                                browser.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pwa-instruction-item">
                                        <span className="pwa-instruction-number">
                                            2
                                        </span>

                                        <div>
                                            <strong>
                                                Add to Home Screen
                                            </strong>

                                            <p className="mb-0 text-body-secondary small">
                                                Select{' '}
                                                <FiPlusSquare className="mx-1" />
                                                Add to Home Screen.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="pwa-benefits mb-4">
                                    <div className="pwa-benefit-item">
                                        <span>✓</span>
                                        Faster application access
                                    </div>

                                    <div className="pwa-benefit-item">
                                        <span>✓</span>
                                        Full-screen app experience
                                    </div>

                                    <div className="pwa-benefit-item">
                                        <span>✓</span>
                                        Selected content available
                                        offline
                                    </div>
                                </div>
                            )}

                            {installError && (
                                <div
                                    className="alert alert-warning py-2 small"
                                    role="alert"
                                >
                                    {installError}
                                </div>
                            )}

                            <div className="d-grid gap-2">
                                {isIOS ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={closePrompt}
                                    >
                                        Got it
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                                        onClick={handleInstall}
                                        disabled={isInstalling}
                                    >
                                        <FiDownloadCloud />

                                        {isInstalling
                                            ? 'Opening install prompt...'
                                            : 'Install application'}
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="btn btn-link text-body-secondary text-decoration-none"
                                    onClick={closePrompt}
                                    disabled={isInstalling}
                                >
                                    Maybe later
                                </button>
                            </div>

                            <p className="small text-body-secondary text-center mt-3 mb-0">
                                After closing, this message will
                                not appear again for 7 days.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PWAInstallPrompt;