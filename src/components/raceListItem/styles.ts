import RN from 'react-native'

export const styles = RN.StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "#efefef",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 6,
        marginBottom: 4
    },
    listItemNameContainer: {
        flex: 1
    },
    meetinNameText: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 4
    },
    raceNumberText: {
        color: "#777"
    }

})