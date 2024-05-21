import { useState } from 'react'
import {
	TextInput,
	TextInputProps,
	StyleSheet,
	Pressable,
	View
} from 'react-native'

import { Colors, Radius } from '../tokens'

import { EyeClosedIcon, EyeOpenedIcon } from '../../assets/icons'

export function Input({
	isPassword,
	...props
}: TextInputProps & { isPassword?: boolean }) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	return (
		<View style={styles.field}>
			<TextInput
				style={styles.input}
				secureTextEntry={isPassword && !isPasswordVisible}
				placeholderTextColor={Colors.gray}
				{...props}
			/>

			{isPassword && (
				<Pressable
					style={styles.eyeIcon}
					onPress={() => setIsPasswordVisible((state) => !state)}
				>
					{isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
				</Pressable>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	field: {
		position: 'relative'
	},
	input: {
		backgroundColor: Colors.violetDark,
		borderRadius: Radius.r10,
		height: 58,
		fontFamily: 'Fira Sans',
		fontSize: 16,
		color: Colors.gray,
		paddingVertical: 0,
		paddingHorizontal: 24
	},
	eyeIcon: {
		position: 'absolute',
		paddingHorizontal: 20,
		paddingVertical: 18,
		right: 0
	}
})
