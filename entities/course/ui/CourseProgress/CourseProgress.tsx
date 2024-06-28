import { StyleSheet, Text, View } from 'react-native'

import { Colors, Fonts, Radius } from '@/shared/tokens'

export function CourseProgress({
	totalLessons,
	passedLessons
}: {
	totalLessons: number
	passedLessons: number
}) {
	const percent = Math.round((passedLessons / totalLessons) * 100)

	return (
		<View style={styles.wrapper}>
			<View style={styles.head}>
				<Text style={styles.textPercent}>{percent}%</Text>
				<Text style={styles.textCount}>
					{passedLessons}/{totalLessons}
				</Text>
			</View>
			<View style={styles.bar}>
				<View style={{ ...styles.progress, width: `${percent}%` }} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 18
	},
	head: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 6
	},
	textPercent: {
		fontFamily: Fonts.semiBold,
		fontSize: Fonts.f16,
		color: Colors.secondary
	},
	textCount: {
		fontFamily: Fonts.semiBold,
		fontSize: Fonts.f12,
		color: Colors.grayLight
	},
	bar: {
		backgroundColor: Colors.border,
		borderRadius: Radius.r20,
		height: 5
	},
	progress: {
		backgroundColor: Colors.secondary,
		borderRadius: Radius.r20,
		height: 5
	}
})
