import { Redirect } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { useAtomValue } from 'jotai'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { authAtom } from '@/entities/auth/model/auth.state'
import { CustomDrawer } from '@/entities/layout/ui/CustomDrawer/CustomDrawer'

import { MenuButton } from '@/features/layout/ui/MenuButton/MenuButton'

import { Colors, Fonts } from '@/shared/tokens'

export default function AppLayout() {
	const { access_token } = useAtomValue(authAtom)

	if (!access_token) return <Redirect href='/login' />

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
			</Drawer>
		</GestureHandlerRootView>
	)
}
