const getApiUrl = (url, path, z) => {
    const noTrailingSlash = url.replace(/\/$/, '');

    return `${noTrailingSlash}/api/v1/${path}`;
};

export { getApiUrl };
