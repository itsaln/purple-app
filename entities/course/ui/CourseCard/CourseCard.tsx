import { Image, StyleSheet, Text, View } from 'react-native'

import { StudentCourseDescription } from '@/entities/course/model/course.model'

import { Colors, Fonts, Gaps, Radius } from '@/shared/tokens'
import { Chip } from '@/shared/Chip/Chip'
import { Button } from '@/shared/Button/Button'

export function CourseCard({
	image,
	shortTitle,
	courseOnDirection
}: StudentCourseDescription) {
	return (
		<View style={styles.card}>
			<Image
				source={{
					uri: image
				}}
				style={styles.image}
				height={200}
			/>
			<View style={styles.header}>
				<Text style={styles.title}>{shortTitle}</Text>
				<View style={styles.chips}>
					{courseOnDirection.length > 0 &&
						courseOnDirection.map((c, i) => (
							<Chip key={`${c.direction.name}_${i}`} text={c.direction.name} />
						))}
				</View>
			</View>
			<View style={styles.footer}>
				<Button text='Купить' />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'column',
		backgroundColor: Colors.blackLight,
		borderRadius: Radius.r10
	},
	image: {
		objectFit: 'cover',
		borderTopLeftRadius: Radius.r10,
		borderTopRightRadius: Radius.r10
	},
	header: {
		paddingHorizontal: 24,
		paddingVertical: 18
	},
	title: {
		fontFamily: Fonts.regular,
		fontSize: Fonts.f21,
		color: Colors.white,
		marginBottom: 12
	},
	chips: {
		flexDirection: 'row',
		gap: Gaps.g10
	},
	footer: {
		backgroundColor: Colors.violetDark,
		borderBottomLeftRadius: Radius.r10,
		borderBottomRightRadius: Radius.r10,
		paddingHorizontal: 24,
		paddingVertical: 20
	}
})
