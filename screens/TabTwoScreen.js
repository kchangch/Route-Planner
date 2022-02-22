import { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { getMap } from "../api/requests";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
	const [bingMap, setBingMap] = useState();

	useEffect(() => {
		async function bingMap() {
			await getMap("redmond, WA", "vancouver, BC");
		}
		const response = bingMap();
		setBingMap(response);
	}, []);

	if (!bingMap) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=Seattle,WA;64;1&wp.1=Vancouver,BC;66;2&key=An-M9Xapv_1uHmLvgNXgpT35zIQW3Awc3IFwKW-widjHmzJB10nE8U1I1D404pzV`,
				}}
				style={{ width: 400, height: 400 }}
			/>
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
});
