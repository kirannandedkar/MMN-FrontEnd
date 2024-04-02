async function fetchData(url : string, method: string, req_body: any, customHeaders: any) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...customHeaders 
        },
        body: req_body ? JSON.stringify(req_body) : null,
    };
    try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch data');
    }
}

const POST = (url: string, req_body: any, headers = {}) => fetchData(url, 'POST', req_body, headers);
const GET = (url: string, headers = {}) => fetchData(url, 'GET', null, headers);
const PUT = (url: string, data: any, headers = {}) => fetchData(url, 'PUT', data, headers);
const DELETE = (url: string, data: any, headers = {}) => fetchData(url, 'DELETE', data, headers);

export { POST, GET, PUT, DELETE };
