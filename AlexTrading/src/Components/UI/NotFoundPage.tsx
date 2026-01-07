import { Link } from "react-router-dom";
import '../../Styles/Error.css';

export const NotFoundPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-background dark dark:bg-gray-900 shadow-lg p-8">
        <h1 className="text-6xl font-extrabold tracking-tight text-primary">
            404
        </h1>
        <br/>
        <p className="text-lg text-foreground text-center max-w-md">
            The page you are looking for does not exist.
        </p>
        
        <Link
            to="/"
            className="inline-flex items-center px-6 py-2 rounded-md font-medium"
            style={{ backgroundColor: '#272727ff', color: '#00ffff' }}
        >
            Return to Dashboard
        </Link>
    </div>
);