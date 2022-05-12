import { Container } from "@components/profile/Container";
import Favorites from "@components/profile/Favorites";
import Tabs from "@components/profile/Tabs";
import UserInfo from "@components/profile/UserInfo";
import { useState } from "react";

function Profile() {
	const [onUserInfo, setOnUserInfo] = useState(true);
	return (
		<Container>
			<Tabs setOnUserInfo={setOnUserInfo} />
			{onUserInfo ? <UserInfo /> : <Favorites />}
		</Container>
	);
}

export default Profile;
