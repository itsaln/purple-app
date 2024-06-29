import { useEffect } from 'react'
import {
	setNotificationHandler,
	addNotificationReceivedListener,
	addNotificationResponseReceivedListener
} from 'expo-notifications'
import { useRouter } from 'expo-router'

export function Notification() {
	const router = useRouter()

	setNotificationHandler({
		handleNotification: async () => ({
			shouldPlaySound: true,
			shouldSetBadge: true,
			shouldShowAlert: true
		})
	})

	useEffect(() => {
		const subReceived = addNotificationReceivedListener((notification) => {
			console.log(notification.request.content.data)
		})

		const subResponseReceived = addNotificationResponseReceivedListener(
			(notification) => {
				const alias = notification.notification.request.content.data.alias
				router.push(`/(app)/course/${alias}`)
			}
		)

		return () => {
			subReceived.remove()
			subResponseReceived.remove()
		}
	}, [])

	return <></>
}
