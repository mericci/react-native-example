import React from 'react';
import { StyleSheet, View} from 'react-native';

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        marginHorizontal: 10,
        marginVertical: 2,
        borderWidth: 0.5,
    },
    cardContent:{
        marginHorizontal: 18,
        marginVertical: 5,
        alignItems: "center"
    }
})