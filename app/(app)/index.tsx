import { useEffect } from 'react'
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	StyleSheet,
	View
} from 'react-native'
import { useAtomValue, useSetAtom } from 'jotai'

import {
	courseAtom,
	loadCourseAtom
} from '@/entities/course/model/course.state'
import { CourseCard } from '@/entities/course/ui/CourseCard/CourseCard'
import { StudentCourseDescription } from '@/entities/course/model/course.model'
import { Colors } from '@/shared/tokens'

export default function MyCourses() {
	const { isLoading, error, courses } = useAtomValue(courseAtom)
	const loadCourse = useSetAtom(loadCourseAtom)

	const renderCourse = ({ item }: { item: StudentCourseDescription }) => (
		<View style={styles.item}>
			<CourseCard {...item} />
		</View>
	)

	useEffect(() => {
		let ignore = loadCourse()
	}, [])

	return (
		// <ScrollView>
		// 	<View style={styles.wrapper}>
		// 		{courses.length > 0 &&
		// 			courses.map((c, i) => <CourseCard key={`${c.id}_${i}`} {...c} />)}
		// 	</View>
		// </ScrollView>

		<>
			{isLoading && <ActivityIndicator style={styles.activity} size='large' color={Colors.primary} />}
			{courses.length > 0 && (
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={loadCourse}
							tintColor={Colors.primary}
							titleColor={Colors.primary}
						/>
					}
					data={courses}
					keyExtractor={(item, index) => `${item.id}_${index}`}
					renderItem={renderCourse}
				/>
			)}
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
