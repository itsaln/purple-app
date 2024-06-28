import { useState } from 'react'
import {
	TextInput,
	TextInputProps,
	StyleSheet,
	Pressable,
	View
} from 'react-native'

import { Colors, Fonts, Radius } from '../tokens'

import { EyeClosedIcon, EyeOpenedIcon } from '../../assets/icons'

export function Input({
	isPassword,
	style,
	...props
}: TextInputProps & { isPassword?: boolean }) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	return (
		<View style={style}>
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
	// field: {
	// 	position: 'relative'
	// },
	input: {
		backgroundColor: Colors.violetDark,
		borderRadius: Radius.r10,
		height: 58,
		fontFamily: Fonts.regular,
		fontSize: Fonts.f16,
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
