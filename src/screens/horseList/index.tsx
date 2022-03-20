import React, { useEffect, useState } from 'react'
import RN from 'react-native'
import { API } from '../../api'
import { FBSegmentedControl } from '../../components/segmentedControl'
import { RaceSummary } from '../../model/race'
import { styles } from './styles'
import { RaceListItem } from '../../components/raceListItem'
import { Category, CategoryEnumHelper } from '../../type/categoryEnum'


const MAX_ITEM_COUNT = 5

export const HorseListScreen = (props: any) => {

    const [originalRaces, setOriginalRaces] = useState<RaceSummary[]>([])
    const [filteredRaces, setFilteredRaces] = useState<RaceSummary[]>([])
    const [category, setCategory] = useState<Category | null>(null)
    const [error, setError] = useState<string>("")

    // call api 
    const _fetchApi = async () => {
        const result = await API.getRaceSummaries()

        if (result.success) {
            setOriginalRaces(result.data ?? [])
        } else {
            setError(result.message)
        }
    }

    // render list item
    const _renderItem = (props: { item: RaceSummary }) => {

        return (
            <RaceListItem
                item={props.item}
                onRequestRemove={id => {
                    // instead of removing the item from stored list, 
                    _fetchApi()
                }}
            />
        )
    }

    // init
    useEffect(() => {
        _fetchApi()
    }, [])

    // everytime when races data is arrived OR category changed
    useEffect(() => {

        // filter race list 
        const _filter = (item: RaceSummary, categoryId: string | null): boolean => {

            // remove item if started time is more than 1 minute ago
            if ((new Date().getTime()) - item.advertised_start.seconds * 1000 > 60000) {
                return false
            }
            // always include if category is not specified.
            if (!!categoryId === false) {
                return true
            } 
            // include if category matches
            if (item.category_id === categoryId) {
                return true
            }
            return false
        }

        // do nothing if races are empty
        if (originalRaces.length == 0) { return }

        const filtered = originalRaces.filter(o => _filter(o, category))

        setFilteredRaces(originalRaces.filter(o => _filter(o, category)).slice(0, MAX_ITEM_COUNT))

    }, [category, originalRaces])

    // display error message
    if (error) {
        return (
            <RN.SafeAreaView>
                <RN.Text>{error}</RN.Text>
            </RN.SafeAreaView>
        )
    }

    return (
        <RN.SafeAreaView  >
            <RN.View style={styles.container} >
                <RN.Text style={styles.titleText} >🐎Next to go🐎</RN.Text>
                <FBSegmentedControl
                    selectedIndex={3} // hard-coded (but default to `All`)
                    onChangeSelectedIndex={d => setCategory(CategoryEnumHelper.indexToCategory(d))}
                    values={[
                        CategoryEnumHelper.categoryName(Category.Greyhound), 
                        CategoryEnumHelper.categoryName(Category.Harness), 
                        CategoryEnumHelper.categoryName(Category.Horse), "All"]}
                />
                <RN.FlatList
                    data={filteredRaces}
                    renderItem={_renderItem}
                    style={styles.flatList}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<RN.Text>No races found</RN.Text>}
                />
            </RN.View>

        </RN.SafeAreaView>
    )

}