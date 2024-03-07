import ApiService from './ApiService'

export async function apPutCrmCustomer<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/customers',
        method: 'put',
        data,
    })
}

export async function apiGetChildList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `/children/fetchChildrenList/0/50`,
        method: 'get',
    })
}

// export async function createSponsor(data: SponsorInformationType) {
//     return ApiService.fetchData<AxiosResponse, SponsorInformationType>({
//         url: '/sponsors/createSponsor',
//         method: 'post',
//         data,
//     })
// }
