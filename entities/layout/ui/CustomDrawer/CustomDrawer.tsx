import {
	DrawerContentComponentProps,
	DrawerContentScrollView
} from '@react-navigation/drawer'
import { Text, View, StyleSheet } from 'react-native'

export function CustomDrawer(props: DrawerContentComponentProps) {
	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={styles.scrollView}
		>
			<View>
				<Text>Text</Text>
			</View>
		</DrawerContentScrollView>
	)
}

export const styles = StyleSheet.create({
	scrollView: {
		flex: 1
	}
})
