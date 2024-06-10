import { useState } from 'react'
import { PressableProps, Pressable, StyleSheet, View } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'

import { Colors } from '@/shared/tokens'

import { MenuIcon } from '@/assets/icons'

interface IButton extends PressableProps {}

export function MenuButton({ ...props }: IButton) {
	const navigation = useNavigation()

	const [clicked, setClicked] = useState(false)

	return (
		<Pressable
			onPressIn={() => setClicked(true)}
			onPressOut={() => setClicked(false)}
			onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
			{...props}
		>
			<View
				style={{
					...styles.button,
					backgroundColor: clicked ? Colors.violetDark : Colors.blackLight
				}}
			>
				<MenuIcon />
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15
	}
})
