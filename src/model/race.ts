


export interface RaceApiResponse {
    race_summaries: any,
    next_to_go_ids: string[]
}

// filled only required field for the tas
export interface RaceSummary {
    race_id: string,
    category_id: string,
    race_number: number,
    advertised_start: {seconds: number},
    meeting_name: string
}