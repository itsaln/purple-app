import {
	DrawerContentComponentProps,
	DrawerContentScrollView
} from '@react-navigation/drawer'
import { Text, View, StyleSheet, Image } from 'react-native'

import { CustomLink } from '@/shared/CustomLink/CustomLink'
import { Colors } from '@/shared/tokens'

export function CustomDrawer(props: DrawerContentComponentProps) {
	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={styles.scrollView}
		>
			<View>
				<Text>Text</Text>
				<CustomLink href={'/login'} text='Выход' />
			</View>
			<View>
				<Image
					source={require('../../../../assets/logo.png')}
					resizeMode='contain'
				/>
			</View>
		</DrawerContentScrollView>
	)
}

export const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: Colors.black
	}
})
