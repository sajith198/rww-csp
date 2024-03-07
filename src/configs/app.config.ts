export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'https://csp-backend-4gyg.onrender.com/api/v1/',
    // apiPrefix: 'http://192.168.29.254:8080/api/v1/',
    authenticatedEntryPath: '/app/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/app',
    locale: 'en',
    enableMock: false,
}

export default appConfig
