import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Orientation } from 'expo-screen-orientation'

import { loginAtom } from '@/entities/auth/model/auth.state'

import { Colors, Gaps } from '@/shared/tokens'
import { useScreenOrientation } from '@/shared/hooks'
import { Input } from '@/shared/Input/Input'
import { Button } from '@/shared/Button/Button'
import { ErrorNotification } from '@/shared/ErrorNotification/ErrorNotification'
import { CustomLink } from '@/shared/CustomLink/CustomLink'

export default function Login() {
	const orientation = useScreenOrientation()

	const [localError, setLocalError] = useState<string | undefined>()
	const [email, setEmail] = useState<string | undefined>()
	const [password, setPassword] = useState<string | undefined>()
	const [{ access_token, isLoading, error }, login] = useAtom(loginAtom)

	const onSubmit = () => {
		if (!email) {
			setLocalError('Не введён email')
			return
		}
		if (!password) {
			setLocalError('Не введён пароль')
			return
		}

		login({ email, password })
	}

	useEffect(() => {
		if (error) setLocalError(error)
	}, [error])

	useEffect(() => {
		if (access_token) router.replace('/(app)')
	}, [access_token])

	return (
		<View style={styles.container}>
			<ErrorNotification error={localError} />
			<View style={styles.content}>
				<Image
					source={require('../assets/logo.png')}
					style={styles.logo}
					resizeMode='contain'
				/>
				<View style={styles.form}>
					<View
						style={{
							...styles.inputs,
							flexDirection:
								orientation === Orientation.PORTRAIT_UP ? 'column' : 'row'
						}}
					>
						<Input
							style={{
								width:
									orientation === Orientation.PORTRAIT_UP
										? 'auto'
										: Dimensions.get('window').width / 2 - 16 - 48
							}}
							placeholder='Email'
							onChangeText={setEmail}
							autoCapitalize='none'
						/>
						<Input
							style={{
								width:
									orientation === Orientation.PORTRAIT_UP
										? 'auto'
										: Dimensions.get('window').width / 2 - 16 - 48
							}}
							isPassword
							placeholder='Пароль'
							onChangeText={setPassword}
						/>
					</View>
					<Button text='Войти' onPress={onSubmit} isLoading={isLoading} />
				</View>
				<CustomLink href={'/restore'} text='Восстановить пароль' />
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
	},
	inputs: {
		gap: Gaps.g16
	}
})
