import { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { Colors, Gaps } from '../shared/tokens'

import { Input } from '../shared/Input/Input'
import { Button } from '../shared/Button/Button'
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification'
import { CustomLink } from '../shared/CustomLink/CustomLink'

export default function Login() {
	const [error, setError] = useState<string | undefined>()

	const alert = () => {
		setError('Неверный логин или пароль')
		setTimeout(() => {
			setError(undefined)
		}, 4000)
	}

	return (
		<View style={styles.container}>
			<ErrorNotification error={error} />
			<View style={styles.content}>
				<Image
					source={require('../assets/logo.png')}
					style={styles.logo}
					resizeMode='contain'
				/>
				<View style={styles.form}>
					<Input placeholder='Email' />
					<Input isPassword placeholder='Пароль' />
					<Button text='Войти' onPress={alert} />
				</View>
				<CustomLink
					href={'/restores'}
					text='Восстановить пароль'
				/>
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
