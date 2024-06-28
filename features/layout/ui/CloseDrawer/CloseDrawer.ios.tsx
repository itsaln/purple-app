import { Pressable, StyleSheet, View } from 'react-native'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'

import { CloseIcon } from '@/assets/icons'

export function CloseDrawer(navigation: DrawerNavigationHelpers) {
	return (
		<Pressable onPress={() => navigation.closeDrawer()}>
			<View style={styles.button}>
				<CloseIcon />
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		right: 20
	}
})
