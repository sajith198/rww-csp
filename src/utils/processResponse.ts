import { Filter, TableQueries } from '@/@types/common'
import { AxiosResponse } from 'axios'
import sortBy from './sortBy'
import wildCardSearch from './wildCardSearch'
import paginate from './paginate'

function processResponseData(
    dataList: any,
    reqData: TableQueries & { filterData?: Filter }
) {
    // const sanitizeUsers = response.data.data.filter((elm :any) => typeof elm !== 'function')
    let data = dataList
    const { pageIndex, pageSize, sort, query } = reqData
    console.log(reqData)
    try {
        if (dataList) {
            // Check if sort is provided and has key and order
            if (sort && sort.key && sort.order) {
                const { order, key } = sort
                if (typeof key === 'string') {
                    if (key === 'childCount') {
                        data.sort(
                            sortBy(key, order === 'desc', (a: any) =>
                                parseInt(a, 10)
                            )
                        )
                    } else if (
                        key !== 'lastOnline' &&
                        key !== 'phone' &&
                        key !== 'childCount'
                    ) {
                        data.sort(
                            sortBy(key, order === 'desc', (a: any) =>
                                (a.toString() as string).toUpperCase()
                            )
                        )
                    } else {
                        data.sort(
                            sortBy(key, order === 'desc', (a: any) =>
                                parseInt(a, 10)
                            )
                        )
                    }
                }
            }

            if (query) {
                data = wildCardSearch(data, query)
            }

            data = paginate(data, pageSize, pageIndex)
        }
    } catch (error) {
        console.log(error)
    }
    const responseData = {
        data: data,
        total: dataList.length,
    }

    return responseData
}

export default processResponseData
