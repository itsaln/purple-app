import { Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { LinkProps } from 'expo-router/build/link/Link'

import { Colors, Fonts } from '../tokens'

export function CustomLink({ text, ...props }: LinkProps & { text: string }) {
	return (
		<Link style={styles.link} {...props}>
			<Text>{text}</Text>
		</Link>
	)
}

const styles = StyleSheet.create({
	link: {
		fontFamily: Fonts.regular,
		fontSize: Fonts.f18,
		color: Colors.link
	}
})
