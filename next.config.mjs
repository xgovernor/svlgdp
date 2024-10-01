/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["net"],
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
