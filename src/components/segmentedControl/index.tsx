import React, { useCallback, useState } from 'react'
import RN from 'react-native'


interface Props {
    selectedIndex: number,
    onChangeSelectedIndex: (index: number) => any,
    values: string[]
}

const hPadding = 4

export const FBSegmentedControl: React.FC<Props> = (props) => {

    const [selected, setSelected] = useState(props.selectedIndex)

    const _handleSelected = useCallback((index: number) => {
        setSelected(index)
        props.onChangeSelectedIndex(index)
    }, [])

    return (
        <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#eee", padding: 3, borderRadius: 5 }} >
            {
                props.values.map((v, i) => {
                    const bg = i === selected ? "#cd4" : "transparent"
               
                    return (
                        <RN.Pressable
                            onPress={() => _handleSelected(i)}
                            style={{
                                backgroundColor: bg,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 10,
                                borderRadius: 5,
                            }}
                            key={i.toString()}
                        >
                            <RN.Text>{v}</RN.Text>
                        </RN.Pressable>
                    )
                })
            }
        </RN.View>
    )

}


const styles = RN.StyleSheet.create({
    rootContainer: {
        backgroundColor: "#eee",
        borderRadius: 10,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
    },
    animatingBarContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        // padding: 3,
    },
    animatingBar: {
        position: 'absolute',
        top: 4,
        bottom: 4,
    },
    animatingBarColor: {
        flex: 1,
        left: hPadding,
        right: hPadding,
        backgroundColor: "#ed4",
        borderRadius: 6,
    },
    segment: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 6,
        justifyContent: 'center',
        minHeight: 36
    },
    segmentText: {
        fontSize: 12,
        fontWeight: '400'
    }

})