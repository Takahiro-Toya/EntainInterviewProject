import React, { useEffect, useState } from 'react'
import RN from 'react-native'
import { RaceSummary } from '../../model/race'
import { styles } from './styles'
import moment from 'moment'

interface Props {
    item: RaceSummary
    // when this item needs to be removed
    onRequestRemove: (id: string) => void
}

export const RaceListItem: React.FC<Props> = (props) => {

    const [time, setTime] = useState("...")

    const ONE_SECOND_IN_MILLISECOND = 1000
    const REMOVE_THRESHOLD = 0
    const SECONDS_ONLY_THRESHOLD = 1
    const MINUTES_ONLY_THRESHOLD = 5

    useEffect(() => {
        // update every 1 second 
        const interval = setInterval(() => {
            const current = new Date().getTime() / ONE_SECOND_IN_MILLISECOND
            const start = props.item.advertised_start.seconds
            const diff = start - current
            const duration = moment.duration(diff, 'seconds')
            
            const m = duration.minutes()
            const s = duration.seconds()
            // past 1 minute
            if (m < REMOVE_THRESHOLD) {
                // notify parent that this item needs to be remvoed
                props.onRequestRemove(props.item.race_id)
            // less than 1 minute (display only seconds)
            } else if (m < SECONDS_ONLY_THRESHOLD) {
                setTime(`${s}s`)
            // less than 5 minutes (display minutes and seconds)
            } else if (m < MINUTES_ONLY_THRESHOLD) {
                setTime(`${m}m${s}s`)
            // more than 5 minutes
            } else {
                setTime(`${m}m`)
            }
        }, ONE_SECOND_IN_MILLISECOND)

        return () => clearInterval(interval)

    }, [props.item])

    return (
        <RN.View style={styles.listItemContainer} >
            <RN.View style={styles.listItemNameContainer} >
                <RN.Text style={styles.meetinNameText} >{props.item.meeting_name}</RN.Text>
                <RN.Text style={styles.raceNumberText} >Race number: {props.item.race_number}</RN.Text>
            </RN.View>
            <RN.Text>{time}</RN.Text>
        </RN.View>
    )

}