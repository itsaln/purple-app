import { useEffect } from 'react'
import {
	DrawerContentComponentProps,
	DrawerContentScrollView
} from '@react-navigation/drawer'
import { View, StyleSheet, Image } from 'react-native'
import { useAtom, useSetAtom } from 'jotai'

import { logoutAtom } from '@/entities/auth/model/auth.state'
import { loadProfileAtom } from '@/entities/user/model/user.state'
import { MenuItem } from '@/entities/layout/ui/MenuItem/MenuItem'

import { CloseDrawer } from '@/features/layout/ui/CloseDrawer/CloseDrawer'

import { CustomLink } from '@/shared/CustomLink/CustomLink'
import { Colors } from '@/shared/tokens'

import { UserMenu } from '@/widget/user/ui/UserMenu/UserMenu'

import CoursesIcon from '@/assets/menu/courses'
import ProfileIcon from '@/assets/menu/profile'


const MENU = [
	{ text: 'Курсы', icon: <CoursesIcon />, path: 'index' },
	{ text: 'Профиль', icon: <ProfileIcon />, path: 'profile' }
]

export function CustomDrawer(props: DrawerContentComponentProps) {
	const logout = useSetAtom(logoutAtom)
	const [profile, loadProfile] = useAtom(loadProfileAtom)

	useEffect(() => {
		let ignore = loadProfile()
	}, [])

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={styles.scrollView}
		>
			<View style={styles.content}>
				<CloseDrawer {...props.navigation} />
				<UserMenu user={profile.profile} />

				{MENU.map((menuItem, index) => (
					<MenuItem
						key={`${menuItem.path}_${index}`}
						{...menuItem}
						drawer={props}
						// navigation={props.navigation}
					/>
				))}
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
