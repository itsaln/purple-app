import { Text, View } from 'react-native'
import { Link } from 'expo-router'

export default function Restore() {
	return (
		<View>
			<Link href={'/'}>
				<Text>Restore</Text>
			</Link>
		</View>
	)
}
