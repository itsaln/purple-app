import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack, SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

import { Colors } from '@/shared/tokens'
import { Notification } from '@/shared/Notification/Notification'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		'FiraSans-Regular': require('../assets/fonts/FiraSans-Regular.ttf'),
		'FiraSans-SemiBold': require('../assets/fonts/FiraSans-SemiBold.ttf')
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
			<Notification />
			<StatusBar style='light' />
			<Stack
				screenOptions={{
					statusBarColor: Colors.black,
					headerShown: false,
					contentStyle: {
						backgroundColor: Colors.black
					}
				}}
			>
				<Stack.Screen name='login' />
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
