import { StyleSheet, Text, View, Image } from 'react-native'

import { Input } from './shared/Input/Input'
import { Button } from './shared/Button/Button'
import { Colors, Gaps } from './shared/tokens'

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Image
					source={require('./assets/logo.png')}
					style={styles.logo}
					resizeMode='contain'
				/>
				<View style={styles.form}>
					<Input placeholder='Email' />
					<Input isPassword placeholder='Пароль' />
					<Button text='Войти' />
				</View>
				<Text>Восстановить пароль</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.black,
		flex: 1,
		justifyContent: 'center',
		padding: 55
	},
	content: {
		alignItems: 'center',
		gap: Gaps.g50
	},
	logo: {
		width: 220
	},
	form: {
		alignSelf: 'stretch',
		gap: Gaps.g16
	}
})
