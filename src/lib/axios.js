import Axios from 'axios';

	const axios = Axios.create({
		baseURL: "http://199.247.3.204/",
		headers: {
			"Content-Type": "application/json",
			"Accept": "*/*",
			"X-Requested-With": "XMLHttpRequest"
		}
	});
	
	export default axios;