import {
	PressableProps,
	Pressable,
	Text,
	StyleSheet,
	Animated,
	GestureResponderEvent,
	ActivityIndicator
} from 'react-native'

import { Colors, Fonts, Radius } from '../tokens'

interface IButton extends PressableProps {
	text: string
	isLoading?: boolean
}

export function Button({ text, isLoading, ...props }: IButton) {
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
				{isLoading ? (
					<ActivityIndicator size='large' color={Colors.white} />
				) : (
					<Text style={styles.text}>{text}</Text>
				)}
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
		fontFamily: Fonts.regular,
		fontSize: Fonts.f18,
		color: Colors.white
	}
})
