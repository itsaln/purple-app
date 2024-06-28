import { useEffect, useState } from 'react'
import {
	Orientation,
	getOrientationAsync,
	addOrientationChangeListener,
	removeOrientationChangeListeners
} from 'expo-screen-orientation'

export function useScreenOrientation() {
	const [orientation, setOrientation] = useState<Orientation>()

	useEffect(() => {
		getOrientationAsync().then((o) => setOrientation(o))
		addOrientationChangeListener((e) => {
			setOrientation(e.orientationInfo.orientation)
		})

		return () => {
			removeOrientationChangeListeners()
		}
	}, [])

	return orientation
}
