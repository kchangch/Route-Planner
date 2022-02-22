import axios from "axios";

const authenticatedSharedRequest = axios.create();
const API_KEY =
	"An-M9Xapv_1uHmLvgNXgpT35zIQW3Awc3IFwKW-widjHmzJB10nE8U1I1D404pzV";
const baseURL = "http://dev.virtualearth.net/REST/v1/Routes";

authenticatedSharedRequest.interceptors.request.use(
	async (config) => {
		config.headers["authorization"] = `Bearer ${API_KEY}`;
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

const getRoute = async (origin, destination) => {
	const parameters = {
		"wp.0": origin,
		"wp.1": destination,
		avoid: "minimizeTolls",
		key: API_KEY,
		optmz: "timeWithTraffic",
		optWp: true,
		ra: "routePath",
	};
	const response = await axios
		.get(`http://dev.virtualearth.net/REST/V1/Routes/Driving`, {
			params: parameters,
		})
		.then((response) => {
			return response.data;
		});

	const coordinates = {
		startLatitude:
			response.resourceSets[0].resources[0].routeLegs[0].actualStart
				.coordinates[0],
		startLongitude:
			response.resourceSets[0].resources[0].routeLegs[0].actualStart
				.coordinates[1],
		endLatitude:
			response.resourceSets[0].resources[0].routeLegs[0].actualEnd
				.coordinates[0],
		endLongitude:
			response.resourceSets[0].resources[0].routeLegs[0].actualEnd
				.coordinates[1],
	};

	return coordinates;
};

export { getRoute };
