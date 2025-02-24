import { Redirect } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { useAtomValue } from 'jotai'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { authAtom } from '@/entities/auth/model/auth.state'

import { MenuButton } from '@/features/layout/ui/MenuButton/MenuButton'

import { Colors, Fonts } from '@/shared/tokens'

import { CustomDrawer } from '@/widget/layout/ui/CustomDrawer/CustomDrawer'

export default function AppLayout() {
	const { accessToken } = useAtomValue(authAtom)

	if (!accessToken) return <Redirect href='/login' />

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
				drawerContent={(props) => <CustomDrawer {...props} />}
				screenOptions={() => ({
					headerStyle: {
						backgroundColor: Colors.blackLight,
						shadowColor: Colors.blackLight,
						shadowOpacity: 0
					},
					headerLeft: () => {
						return <MenuButton />
					},
					headerTitleStyle: {
						fontFamily: Fonts.regular,
						fontSize: Fonts.f20,
						color: Colors.white
					},
					sceneContainerStyle: {
						backgroundColor: Colors.black
					}
				})}
			>
				<Drawer.Screen
					name='index'
					options={{
						title: 'Мои курсы'
					}}
				/>
				<Drawer.Screen
					name='profile'
					options={{
						title: 'Профиль'
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	)
}
