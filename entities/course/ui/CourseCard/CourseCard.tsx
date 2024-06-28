import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'

import { StudentCourseDescription } from '@/entities/course/model/course.model'

import { Colors, Fonts, Gaps, Radius } from '@/shared/tokens'
import { Chip } from '@/shared/Chip/Chip'
import { Button } from '@/shared/Button/Button'

export function CourseCard({
	image,
	shortTitle,
	courseOnDirection,
	alias,
	tariffs
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
				<MaskedView
					maskElement={
						<Text style={styles.tariff}>
							Тариф &laquo;{tariffs[0].name}&raquo;
						</Text>
					}
				>
					<LinearGradient
						colors={['#D77BE5', '#6C38CC']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
					>
						<Text style={{ ...styles.tariff, ...styles.tariffWithOpacity }}>
							Тариф &laquo;{tariffs[0].name}&raquo;
						</Text>
					</LinearGradient>
				</MaskedView>
			</View>
			<View style={styles.footer}>
				<Button
					text='Купить'
					onPress={() =>
						Linking.openURL(`https://purpleschool.ru/course/${alias}`)
					}
				/>
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
	tariff: {
		fontFamily: Fonts.regular,
		fontSize: Fonts.f16,
		marginTop: 10
	},
	tariffWithOpacity: {
		opacity: 0
	},
	footer: {
		backgroundColor: Colors.violetDark,
		borderBottomLeftRadius: Radius.r10,
		borderBottomRightRadius: Radius.r10,
		paddingHorizontal: 24,
		paddingVertical: 20
	}
})
