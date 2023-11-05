
type Options = {
    method: string,
    body?: string
    headers: any,
};


export type Response = {
    success: boolean,
    error: string,
    data: any,
};

async function request (url: string, options: Options): Promise<Response> {
    try {
        const res = await fetch(url, options);
        const data = res.json();
        return data;
    } catch(err) {
        return {
            success: false,
            error: err.message,
            data: null,
        };
    }
};

export default request;