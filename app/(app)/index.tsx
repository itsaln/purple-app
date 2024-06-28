import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useAtomValue, useSetAtom } from 'jotai'

import {
	courseAtom,
	loadCourseAtom
} from '@/entities/course/model/course.state'

export default function MyCourses() {
	const { isLoading, error, courses } = useAtomValue(courseAtom)
	const loadCourse = useSetAtom(loadCourseAtom)

	useEffect(() => {
		let ignore = loadCourse()
	}, [])

	return (
		<View>
			{courses.length > 0 &&
				courses.map((c, i) => <Text key={`${c.id}_${i}`}>{c.title}</Text>)}
		</View>
	)
}
