import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { Colors, Fonts, Gaps } from '../shared/tokens'
import { CustomLink } from '../shared/CustomLink/CustomLink'

export default function UnmatchedPage() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Image
					source={require('../assets/images/unmatched.png')}
					style={styles.image}
					resizeMode='contain'
				/>

				<Text style={styles.text}>
					Ооо... что-то пошло не так. Попробуйте вернуться на главный экран
					приложения
				</Text>

				<CustomLink href={'/'} text='На главный экран' />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 55
	},
	content: {
		alignItems: 'center',
		gap: Gaps.g50
	},
	image: {
		width: 204,
		height: 282
	},
	text: {
		fontFamily: 'Fira Sans',
		fontSize: Fonts.f18,
		color: Colors.white,
		textAlign: 'center'
	}
})
