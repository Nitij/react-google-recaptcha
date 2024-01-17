import React, { useEffect, useRef, useState } from 'react';

const ReCaptcha = ({ siteKey, callback }) => {
    const recaptchaRef = useRef(null);
    const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);

    // Define the component function to be called when reCAPTCHA loads
    const onRecaptchaLoad = () => {
        setIsRecaptchaLoaded(true);
    };

    useEffect(() => {
        // Assign the component function to the window callback
        window.onRecaptchaLoad = onRecaptchaLoad;

        if (!window.grecaptcha) {
            // Load the script only if it's not already available
            const script = document.createElement('script');
            script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        } else if (window.grecaptcha && window.grecaptcha.render) {
            // If reCAPTCHA is already loaded, call the function directly
            onRecaptchaLoad();
        }

        // Clean up the global callback on component unmount
        return () => {
            window.onRecaptchaLoad = null;
        };
    }, []);

    useEffect(() => {
        if (isRecaptchaLoaded) {
            window.grecaptcha.render(recaptchaRef.current, {
                'sitekey': siteKey,
                'callback': callback // Callback function to handle the token
            });
        }
    }, [isRecaptchaLoaded]);

    return (
        <div ref={recaptchaRef}></div>
    );
};
export default ReCaptcha;