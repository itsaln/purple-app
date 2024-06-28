import { StyleSheet, Text, View } from 'react-native'

import { Colors, Fonts, Radius } from '@/shared/tokens'

export function Chip({ text }: { text: string }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: Radius.r17
	},
	text: {
		fontFamily: Fonts.regular,
		fontSize: Fonts.f14,
		color: Colors.white
	}
})
