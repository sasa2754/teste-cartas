/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['deckofcardsapi.com'],
      },
    rewrites: () => {
        return [
            {
                source: "/",
                destination: "/home",
            },
            {
                source: "/fetch-client",
                destination: "/fetch-client",
            },
            {
                source: "/axios-client",
                destination: "/axios-client",
            },
            {
                source: "/fetch-server",
                destination: "/fetch-server",
            },
        ] 
    }
};

export default nextConfig;
