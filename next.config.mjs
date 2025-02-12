export function webpack(config) {
    config.resolve.fallback = { 
        fs: false, 
        net: false,
        console: false,
        async_hooks: false, // Disable async_hooks for client-side builds
        ...config.resolve.fallback };
    return config;
}

