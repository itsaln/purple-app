import { ReactNode, useState } from 'react'
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import { DrawerContentComponentProps } from '@react-navigation/drawer'

import { Colors, Fonts, Gaps } from '@/shared/tokens'

interface IMenuItem {
	drawer: DrawerContentComponentProps
	icon: ReactNode
	text: string
	path: string
}

export function MenuItem({
	drawer,
	icon,
	text,
	path,
	...props
}: IMenuItem & PressableProps) {
	const [clicked, setClicked] = useState(false)
	const isActive = drawer.state.routes[drawer.state.index].name === path

	return (
		<Pressable
			{...props}
			onPress={() => drawer.navigation.navigate(path)}
			onPressIn={() => setClicked(true)}
			onPressOut={() => setClicked(false)}
		>
			<View
				style={{
					...styles.menu,
					backgroundColor:
						clicked || isActive ? Colors.violetDark : Colors.black,
					borderColor: isActive ? Colors.primary : Colors.black
				}}
			>
				{icon}
				<Text style={styles.text}>{text}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	menu: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Gaps.g20,
		borderRightWidth: 5,
		paddingHorizontal: 24,
		paddingVertical: 16
	},
	text: {
		fontFamily: Fonts.regular,
		fontSize: Fonts.f16,
		color: Colors.white
	}
})
