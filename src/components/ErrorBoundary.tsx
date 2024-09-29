import { useState } from "react";

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hasError, setHasError] = useState(false);

    return hasError ? (
        <div>Error loading map layers. Please try again later.</div>
    ) : (
        <>
            {children}
        </>
    );
}

export default ErrorBoundary
