import Logger from "../Logger";
import Requests from "../Requests";
import { Endpoints } from "../constants/Endpoints";
import { toast } from "../../providers/ToastProvider";
import { randHexString } from "../../utils/Utils";

class Steam {

	//Generates the "base" cookies for the session (so things like session ID, timezone etc)
	static async populateBaseCookies(): Promise<{ name: string; value: string }[]> {
		const cookies = [];

		Logger.log("Generating base Steam cookies");

		//Retrieve location info for getting country code
		const locData = await Requests.get(Endpoints.LOCATION_DATA, {});

		if (locData.hasError || locData.body.status !== "success") toast.error("Unable to retrieve location information!");
		else {
			cookies.push({ name: "steamCountry", value: `${locData.body.countryCode}|${randHexString(32)}` });
		}

		const tzOffset = new Date().getTimezoneOffset() * -1 * 60;
		cookies.push({ name: "timezoneOffset", value: `${tzOffset},0` });

		cookies.push({ name: "sessionid", value: `${randHexString(24)}` });

		return cookies;
	}
};

export default Steam;