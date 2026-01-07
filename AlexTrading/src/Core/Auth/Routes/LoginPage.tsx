import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";


export const LoginPage = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const requestBody = {email, password}
            
            // Mock login logic
            const response =
                requestBody.email === 'admin@baqlabs.com' && requestBody.password === 'admin'
                    ? {
                        data: {
                            access_token: 'mock-access-token-123',
                        },
                    }
                    : null;

            if (!response) {
                throw new Error('Invalid credentials');
            }
            // Replace this block with a request to a DB and return response 


            localStorage.setItem('access_token', response.data.access_token)
        
            navigate('/trade')
        
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen dark bg-gray-950">
            <form 
                onSubmit={handleLogin} 
                className="bg-white dark:bg-gray-900 shadow-lg rounded-lg px-8 py-10 w-full max-w-md"
            >
            
                <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100 text-center">Login to your account</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-300 text-center">Welcome back!</p>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Email address :</label>
                    <input
                        onChange={e => {setEmail(e.target.value)}}
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="email"
                        autoComplete="email"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Password :</label>
                    <input
                        onChange={e => {setPassword(e.target.value)}}
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="password"
                        // autoComplete="current-password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded transition-colors duration-200 mb-4"
                >
                    LOG IN
                </button>

                <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
                    Don't have an account?{' '}
                    <Link to={'/register'} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        Create an account
                    </Link>
                </p>

                <div className="text-xs text-gray-400 dark:text-gray-400 text-center mt-6">
                    <p className="font-semibold text-gray-500 dark:text-gray-300">Demo User:</p>
                    <p>Email: <span className="font-mono">admin@baqlabs.com</span></p>
                    <p>Password: <span className="font-mono">admin</span></p>
                </div>

            </form>
        </div>
    );
};
