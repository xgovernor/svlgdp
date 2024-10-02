/** @type {import('next').NextConfig} */
const nextConfig = {
    // transpilePackages: ["crypto"],
    // serverExternalPackages: ['crypto'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    }
};

export default nextConfig;
