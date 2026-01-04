
export default async function fetchProducts<T>(url: string, signalApi: AbortSignal): Promise<T> {
    try {
        const resp = await fetch(url);
        console.log('Response status:', resp.status);
        
        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status} - ${resp.statusText}`);
        }
        
        const jsonResp = (await resp.json()) as T;
        console.log('Parsed data:', jsonResp);
        return jsonResp;
    } catch (error) {
        console.error("API FAIL => Error fetching products", error);
        throw error;
    }
}