import { ApiResult } from "../../model/apiResult"
import { RaceApiResponse, RaceSummary } from "../../model/race"

export const getRaceSummaries = async (): Promise<ApiResult<RaceSummary[]>> => {

    const url = "https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10"

    try {
        const response = await fetch(url)
        const jsonObj = await response.json()
        const data: RaceApiResponse = jsonObj.data
        
        return {
            success: true,
            message: 'success',
            data: data.next_to_go_ids.map(n => { return data.race_summaries[n]}),
            responseCode: response.status
        }
    } catch (e: any) {
        return {
            success: false,
            message: typeof e.message === 'string' ? e.message : JSON.stringify(e),
            data: null,
            responseCode: e.status
        }
    }

}