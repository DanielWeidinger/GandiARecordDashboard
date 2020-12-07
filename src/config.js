const config = {
    API_KEY: "ApiKey <gandi api key>",
    BASE_URL: "https://weidinger-5ahif.htl.link/api",
    DEV_BASE_URL: "http://localhost:8080",
    DOMAIN: "htl.link"
}

export const getRoute = (sub) => {
    return config.BASE_URL + "/v5/livedns/domains/" + config.DOMAIN + "/" + sub
}

export const createHref = (sub) => {
    return "https://" + sub + "." + config.DOMAIN
}

export default config