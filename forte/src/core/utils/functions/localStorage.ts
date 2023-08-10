export function setItem (key: string, value:any) {
    try {
        const cache: string = localStorage.getItem(process.env.CACHE_ADDRESS as string) || '{}';
        const usableCache: any = JSON.parse(cache);
        usableCache[`${key}`] = value
        localStorage.setItem(process.env.CACHE_ADDRESS as string, JSON.stringify(usableCache));
        return true;
    } catch (err) {
        return false;
    }

}

export function getItem (key:string) {
    try {
        const cache: string = localStorage.getItem(process.env.CACHE_ADDRESS as string) || '{}';
        const usableCache: any = JSON.parse(cache);
        return usableCache[`${key}`];
    } catch (err) {
        return err;
    }
}

export function removeItem (key:string) {
    try {
        const cache: string = localStorage.getItem(process.env.CACHE_ADDRESS as string) || '{}';
        const usableCache: any = JSON.parse(cache);
        delete usableCache[`${key}`];
        localStorage.setItem(process.env.CACHE_ADDRESS as string, JSON.stringify(usableCache));
        return true;
    } catch (err) {
        return false;
    }
}

export function clearCache () {
    try {
        localStorage.removeItem(process.env.CACHE_ADDRESS as string)
        return true;
    } catch (err) {
        return false;
    }
}