type FetchOption = {
    method? : "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
     headers?: Record<string, string>;
}

class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: FetchOption = {}
    ): Promise<T>{

        const { method = "GET", body, headers  ={}} = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }
        const response =  await fetch(`/api/${endpoint}`, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: defaultHeaders
        })


        return response.json() 

    }
    async getVideos(){
        return await this.fetch("/videos")
    }
}

export  const apiClient = new ApiClient();