import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { getRoute } from "../api/requests";
import MapView, { Marker } from "react-native-maps";
import { getRegionForCoordinates } from "../constants/getRegionForCoordinates";
import { Text, View } from "../components/Themed";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_API_KEY = "AIzaSyBddwGHAlmOAIsgFNeUvDkYiUoqaljVJdc";

export default function TabOneScreen({ navigation }) {
	const [startCoordinates, setStartCoordinates] = useState({});
	const [coordinates, setCoordinates] = useState([]);

	useEffect(() => {
		async function getCoordinates() {
			const response = await getRoute("redmond", "Vancouver");
			const startCoordinates = [
				{
					latitude: response.startLatitude,
					longitude: response.startLongitude,
				},
			];
			const endCoordinates = [
				{
					latitude: response.endLatitude,
					longitude: response.endLongitude,
				},
			];
			const allStartCoordinates = getRegionForCoordinates(startCoordinates);
			const allEndCoordinates = getRegionForCoordinates(endCoordinates);
			setStartCoordinates({
				latitude: allStartCoordinates.latitude,
				longitude: allStartCoordinates.longitude,
				latitudeDelta: allStartCoordinates.latitudeDelta,
				longitudeDelta: allStartCoordinates.longitudeDelta,
			});
			setCoordinates((coords) => [
				...coords,
				{
					latitude: allStartCoordinates.latitude,
					longitude: allStartCoordinates.longitude,
				},
				{
					latitude: allEndCoordinates.latitude,
					longitude: allEndCoordinates.longitude,
				},
			]);
		}
		getCoordinates();
	}, []);

	if (!startCoordinates.latitude || coordinates.length === 0) {
		return null;
	}

	return (
		<View style={styles.container}>
			<MapView
				style={styles.maps}
				initialRegion={{
					latitude: startCoordinates.latitude,
					longitude: startCoordinates.longitude,
					latitudeDelta: startCoordinates.latitudeDelta,
					longitudeDelta: startCoordinates.longitudeDelta,
				}}>
				<MapViewDirections
					origin={coordinates[0]}
					destination={coordinates[1]}
					apikey={GOOGLE_API_KEY} // insert your API Key here
					strokeWidth={4}
					strokeColor="#111111"
				/>
				<Marker coordinate={coordinates[0]} />
				<Marker coordinate={coordinates[1]} />
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	maps: {
		width: Dimensions.get("screen").width,
		height: Dimensions.get("screen").height,
	},
});
