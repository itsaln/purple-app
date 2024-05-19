import {
	PressableProps,
	Pressable,
	Text,
	StyleSheet,
	Animated,
	GestureResponderEvent
} from 'react-native'

import { Colors, Fonts, Radius } from '../tokens'

export function Button({ text, ...props }: PressableProps & { text: string }) {
	const animatedValue = new Animated.Value(100)
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [Colors.primaryHover, Colors.primary]
	})

	const fadeIn = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true
		}).start()
		props.onPressIn && props.onPressIn(e)
	}

	const fadeOut = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 100,
			useNativeDriver: true
		}).start()
		props.onPressOut && props.onPressOut(e)
	}

	return (
		<Pressable onPressIn={fadeIn} onPressOut={fadeOut} {...props}>
			<Animated.View
				style={{
					...styles.button,
					backgroundColor: color
				}}
			>
				<Text style={styles.text}>{text}</Text>
			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Radius.r10,
		height: 58
	},
	text: {
		fontSize: Fonts.f18,
		color: Colors.white
	}
})
