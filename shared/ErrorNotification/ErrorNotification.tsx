import { useEffect, useState } from 'react'
import { Text, StyleSheet, Dimensions, Animated } from 'react-native'

import { Colors, Fonts } from '../tokens'

interface IErrorNotification {
	error?: string
}

export function ErrorNotification({ error }: IErrorNotification) {
	const [isShown, setIsShown] = useState(false)
	const animatedValue = new Animated.Value(-100)

	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true
		}).start()
	}

	useEffect(() => {
		if (!error) return
		setIsShown(true)

		const timerId = setTimeout(() => {
			setIsShown(false)
		}, 3000)

		return () => {
			clearTimeout(timerId)
		}
	}, [error])

	if (!isShown) {
		return <></>
	}

	return (
		<Animated.View
			style={{
				...styles.error,
				transform: [{ translateY: animatedValue }]
			}}
			onLayout={onEnter}
		>
			<Text style={styles.errorText}>{error}</Text>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		width: Dimensions.get('screen').width,
		backgroundColor: Colors.red,
		padding: 15,
		top: 50
	},
	errorText: {
		fontFamily: Fonts.regular,
		fontSize: Fonts.f16,
		color: Colors.white,
		textAlign: 'center'
	}
})
