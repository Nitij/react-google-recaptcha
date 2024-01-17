import React, { useState, useEffect } from 'react';
import ReCaptcha from '../../reCaptcha';
// import useRecaptchaV3 from '../../hooks/reCaptchaV3';
import { getFunctions, httpsCallable } from 'firebase/functions';

const LoginComponent = () => {

    // const executeRecaptcha = useRecaptchaV3('6LcLlTspAAAAABe0AmWBULWA27WK_5LMP31fef-A', 'login')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    // const [submitEnabled, setSubmitEnabled] = useState(false);
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (token.length) {
            setSubmitEnabled(true)
        }
    }, [token])

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        const functions = getFunctions();
        const loginFunction = httpsCallable(functions, 'login');
        try {

            // const recaptchaToken = await executeRecaptcha('login');
            // let data = {
            //     email, password, token: recaptchaToken
            // }

            let data = {
                email, password, token
            }

            const result = await loginFunction(data);
            if (result.data.valid) {
                setMessage('Login successful')
            } else {
                setMessage('Login un-successful')
            }
        } catch (error) {
        }
    };

    const handleToken = (token) => {
        setToken(token)
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                <div className="mt-4">
                    <div>
                        <label className="block" htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mt-4">
                        <ReCaptcha siteKey="6LcFlTspAAAAALo7viD5hD2pTmBH8jUNg3LNmUYb" callback={handleToken} />
                    </div>
                    <div className="flex items-baseline justify-between">
                        <button onClick={handleSubmit} disabled={!submitEnabled} type="submit" className={`${submitEnabled ? 'bg-blue-600 hover:bg-blue-900' : 'bg-gray-600 cursor-not-allowed'} px-6 py-2 mt-4 text-white  rounded-lg `}>Login</button>
                    </div>
                    <div className="mt-4">
                        {message}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
