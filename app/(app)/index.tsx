import { useEffect } from 'react'
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	View
} from 'react-native'
import { useAtomValue, useSetAtom } from 'jotai'
import {
	getPermissionsAsync,
	requestPermissionsAsync,
	IosAuthorizationStatus,
	getExpoPushTokenAsync
} from 'expo-notifications'
import { isDevice } from 'expo-device'
import Constants from 'expo-constants'

import {
	courseAtom,
	loadCourseAtom
} from '@/entities/course/model/course.state'
import { StudentCourseDescription } from '@/entities/course/model/course.model'
import { Button } from '@/shared/Button/Button'
import { Colors } from '@/shared/tokens'

import { CourseCard } from '@/widget/course/ui/CourseCard/CourseCard'

export default function MyCourses() {
	const { isLoading, error, courses } = useAtomValue(courseAtom)
	const loadCourse = useSetAtom(loadCourseAtom)

	const renderCourse = ({ item }: { item: StudentCourseDescription }) => (
		<View style={styles.item}>
			<CourseCard {...item} />
		</View>
	)

	const allowsNotification = async () => {
		const settings = await getPermissionsAsync()

		return (
			settings.granted ||
			settings.ios?.status === IosAuthorizationStatus.PROVISIONAL
		)
	}

	const requestPermissions = async () => {
		return requestPermissionsAsync({
			ios: {
				allowAlert: true,
				allowBadge: true,
				allowSound: true
			}
		})
	}

	const scheduleNotification = async () => {
		const granted = await allowsNotification()
		if (!granted) await requestPermissions()

		if (isDevice) {
			const token = await getExpoPushTokenAsync({
				projectId: Constants.expoConfig?.extra?.eas.projectId
			})

			console.log(token)
		}

		// await scheduleNotificationAsync({
		// 	content: {
		// 		title: 'Новый курс TypeScript',
		// 		body: 'Начни учиться уже сейчас!',
		// 		data: { alias: 'typescript' }
		// 	},
		// 	trigger: {
		// 		seconds: 5
		// 	}
		// })
	}

	useEffect(() => {
		let ignore = loadCourse('other')
	}, [])

	return (
		// <ScrollView>
		// 	<View style={styles.wrapper}>
		// 		{courses.length > 0 &&
		// 			courses.map((c, i) => <CourseCard key={`${c.id}_${i}`} {...c} />)}
		// 	</View>
		// </ScrollView>

		<>
			{isLoading && (
				<ActivityIndicator
					style={styles.activity}
					size='large'
					color={Colors.primary}
				/>
			)}
			<Button text='Напомнить' onPress={scheduleNotification} />
			{courses.length > 0 && (
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={() => loadCourse('other')}
							tintColor={Colors.primary}
							titleColor={Colors.primary}
						/>
					}
					data={courses}
					keyExtractor={(item, index) => `${item.id}_${index}`}
					renderItem={renderCourse}
				/>
			)}
			{error && <Text style={{ color: Colors.red }}>{error}</Text>}
		</>
	)
}

const styles = StyleSheet.create({
	activity: {
		marginTop: 30
	},
	item: {
		padding: 20
	}
})
