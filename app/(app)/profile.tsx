import { Alert, Image, Text, View } from 'react-native'
import { useState } from 'react'
import {
	launchCameraAsync,
	launchImageLibraryAsync,
	MediaTypeOptions,
	PermissionStatus,
	useCameraPermissions,
	useMediaLibraryPermissions
} from 'expo-image-picker'
import { Button } from '@/shared/Button/Button'

export default function Profile() {
	const [image, setImage] = useState<string | null>(null)
	const [cameraPermissions, requestCameraPermission] = useCameraPermissions()
	const [libraryPermissions, requestLibraryPermission] =
		useMediaLibraryPermissions()

	const verifyCameraPermissions = async () => {
		if (cameraPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestCameraPermission()
			return res.granted
		}

		if (cameraPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к камере')
			return false
		}

		return true
	}

	const verifyMediaPermissions = async () => {
		if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestLibraryPermission()
			return res.granted
		}

		if (libraryPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к камере')
			return false
		}

		return true
	}

	const captureAvatar = async () => {
		const isPermissionGranted = await verifyCameraPermissions()

		if (!isPermissionGranted) return

		const result = await launchCameraAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5
		})

		if (!result.assets) return

		setImage(result.assets[0].uri)
	}

	const pickAvatar = async () => {
		const isPermissionGranted = await verifyMediaPermissions()

		if (!isPermissionGranted) return

		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5
		})

		if (!result.assets) return

		setImage(result.assets[0].uri)
	}

	return (
		<View>
			<Text>Profile</Text>
			<Button text='Снять изображение' onPress={captureAvatar} />
			<Button text='Выбрать из галереи' onPress={pickAvatar} />
			{image && (
				<Image
					source={{
						uri: image,
						width: 100,
						height: 100
					}}
				/>
			)}
		</View>
	)
}
