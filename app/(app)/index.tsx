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
	courseAtom,
	loadCourseAtom
} from '@/entities/course/model/course.state'
import { StudentCourseDescription } from '@/entities/course/model/course.model'
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
