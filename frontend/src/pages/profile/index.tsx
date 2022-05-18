import { Container } from "@components/profile/Container";
import Favorites from "@components/profile/Bookmarks";
import Tabs from "@components/profile/Tabs";
import UserInfo from "@components/profile/UserInfo";
import { useState } from "react";
import MyArticle from "@components/profile/MyArticle";
import Bookmarks from "@components/profile/Bookmarks";

function Profile() {
	const [currentTab, setCurrentTab] = useState(0);

	const tabs = ["내 정보", "북마크", "내 매물"];

	const getCurrentTab = () => {
		if (currentTab === 0) return <UserInfo />;
		else if (currentTab === 1) return <Bookmarks />;
		else if (currentTab === 2) return <MyArticle />;
	};

	return (
		<Container>
			<Tabs setCurrentTab={setCurrentTab} tabs={tabs} />
			{getCurrentTab()}
		</Container>
	);
}

export default Profile;
