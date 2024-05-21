import { useEffect } from 'react'
import {
	SafeAreaProvider,
	useSafeAreaInsets
} from 'react-native-safe-area-context'
import { Stack, SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

import { Colors } from '../shared/tokens'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const insets = useSafeAreaInsets()
	const [loaded, error] = useFonts({
		'Fira Sans': require('../assets/fonts/FiraSans-Regular.ttf'),
		'Fira Sans SemiBold': require('../assets/fonts/FiraSans-SemiBold.ttf')
	})

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync()
	}, [loaded])

	useEffect(() => {
		if (error) throw error
	}, [error])

	if (!loaded) return null

	return (
		<SafeAreaProvider>
			<StatusBar style='light' />
			<Stack
				screenOptions={{
					statusBarColor: Colors.black,
					headerShown: false,
					contentStyle: {
						backgroundColor: Colors.black,
						paddingTop: insets.top
					}
				}}
			>
				<Stack.Screen name='index' />
				<Stack.Screen
					name='restore'
					options={{
						presentation: 'modal'
					}}
				/>
			</Stack>
		</SafeAreaProvider>
	)
}
