import axios from 'axios'
import { useQuery } from 'react-query'

export const CallApi = (queryKey, fetchParams, params) => {
    const {
        data,
        error,
        isError,
        isFetched,
        isFetching,
        isLoading,
        isRefetching,
        isStale,
        isSuccess,
        refetch,

    } = useQuery(queryKey, () => fetchData(fetchParams), {
        ...params,
    });
    const fetchData = (params) => {
        return axios.request({
            ...params
        })
    }
    return {
        data,
        error,
        isError,
        isFetched,
        isFetching,
        isLoading,
        isRefetching,
        isStale,
        isSuccess,
        refetch,

    };
}