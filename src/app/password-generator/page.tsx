"use client"
import { useEffect, useState } from 'react';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(8);
    const [options, setOptions] = useState<any>({
        uppercase: true,
        lowercase: true,
        symbols: true,
        numbers: true,
    });

    useEffect(() => {
        generatePassword();
    }, []);

    const generatePassword = () => {
        const characterSets: any = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            symbols: '!@#$%^&*()',
            numbers: '0123456789',
        };

        let validChars = '';
        Object.keys(options).forEach((key: any) => {
            if (options[key]) {
                validChars += characterSets[key];
            }
        });

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += validChars.charAt(
                Math.floor(Math.random() * validChars.length)
            );
        }

        setPassword(newPassword);
    };

    const handleLengthChange = (event: any) => {
        setLength(Number(event.target.value));
    };

    const handleOptionChange = (event: any) => {
        const { name, checked } = event.target;
        setOptions((prevState: any) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const getStrengthIndicator = () => {
        if (password.length <= 5) {
            return 'Weak';
        } else if (password.length <= 10) {
            return 'Medium';
        } else {
            return 'Strong';
        }
    };

    const sliderColor = `bg-green-${length > 10 ? 500 : length > 5 ? 300 : 100}`;

    return (
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
            <div className="container mx-auto p-6 max-w-sm">
                <h2 className="text-2xl mb-4 text-center border-b-2 border-white pb-2">Password Generator</h2>
                <div className="mb-4 border-b-2 border-white pb-4">
                    <label htmlFor="length" className="block font-semibold mb-1">
                        Password Length:
                    </label>
                    <input
                        type="range"
                        id="length"
                        name="length"
                        min={6}
                        max={20}
                        value={length}
                        onChange={handleLengthChange}
                        className={`w-full ${sliderColor}`}
                    />
                    <p className="text-sm text-center">{length}</p>
                </div>
                <div className="mb-4 border-b-2 border-white pb-4">
                    <h3 className="font-semibold mb-2">Include:</h3>
                    {Object.keys(options).map((key) => (
                        <div className="flex items-center mb-2" key={key}>
                            <input
                                type="checkbox"
                                name={key}
                                checked={options[key]}
                                onChange={handleOptionChange}
                                className="mr-2"
                            />
                            <p className="text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={generatePassword}
                    className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Generate Password
                </button>
                <div className="mt-4 border-t-2 border-white pt-4">
                    <strong className="block">Generated Password:</strong>
                    <p className="text-lg font-semibold">{password}</p>
                </div>
                <div className="mt-2 bg-gray-700 py-2 px-4 rounded">
                    <strong className="block text-white">Strength:</strong>
                    <p className="text-lg font-semibold text-white">{getStrengthIndicator()}</p>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;
