import {
	DrawerContentComponentProps,
	DrawerContentScrollView
} from '@react-navigation/drawer'
import { Text, View, StyleSheet, Image } from 'react-native'
import { useSetAtom } from 'jotai'

import { logoutAtom } from '@/entities/auth/model/auth.state'

import { CloseDrawer } from '@/features/layout/ui/CloseDrawer/CloseDrawer'

import { CustomLink } from '@/shared/CustomLink/CustomLink'
import { Colors } from '@/shared/tokens'

export function CustomDrawer(props: DrawerContentComponentProps) {
	const logout = useSetAtom(logoutAtom)

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={styles.scrollView}
		>
			<View style={styles.content}>
				<CloseDrawer {...props.navigation} />
				<Text>Text</Text>
			</View>
			<View style={styles.footer}>
				<CustomLink href={'/login'} onPress={() => logout()} text='Выход' />
				<Image
					style={styles.logo}
					source={require('../../../../assets/logo.png')}
					resizeMode='contain'
				/>
			</View>
		</DrawerContentScrollView>
	)
}

export const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: Colors.black
	},
	content: {
		flex: 1
	},
	footer: {
		gap: 50,
		alignItems: 'center',
		marginBottom: 40
	},
	logo: {
		width: 160
	}
})
