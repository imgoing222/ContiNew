import { Button } from "@components/account/Button";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import UserInfoEdit from "@components/profile/UserInfoEdit";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authApi from "src/api/auth";
import profileApi from "src/api/profile";
import { SET_USER } from "src/store/user";
import UserInfoType from "src/types/UserInfoType";
import styled from "styled-components";
import { Container } from "./Container";

function UserInfo() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState<UserInfoType>();

	const handleDeleteAccountClick = async () => {
		if (window.confirm("정말로 탈퇴하시겠습니까?")) {
			await authApi.deleteAccount();
			authApi.logout();
		}
	};

	useEffect(() => {
		profileApi.getUserInfo().then((res) => {
			setUserInfo(res.data);
			dispatch(SET_USER(res.data));
		});
	}, []);

	return (
		<Container border padding={4}>
			{userInfo && (
				<>
					{userInfo.phone_auth && <p>인증 된 회원입니다</p>}
					<Label>아이디</Label>
					<Input disabled value={userInfo.login_id} />
					<UserInfoEdit username={userInfo.username} />
					{!userInfo.phone_auth && (
						<Box>
							<SmsVerification
								onClick={() => {
									router.push("/account/smsVerification");
								}}
							>
								휴대폰 인증
							</SmsVerification>
							<ArrowButton icon={faChevronRight} color="#ababab" />
						</Box>
					)}
					<DeleteAccount onClick={handleDeleteAccountClick}>회원탈퇴</DeleteAccount>
				</>
			)}
		</Container>
	);
}

const DeleteAccount = styled.p`
	cursor: pointer;
	font-size: 1.3rem;
	margin-top: 7rem;
	color: #787878;
	text-align: end;
`;

const SmsVerification = styled.button`
	width: 100%;
	cursor: pointer;
	margin-top: 4rem;
	text-align: start;
	background-color: #f8f8f8;
	border: 0.2px solid #dedede;
	padding: 0.7rem 1rem;
	color: #595959;
`;

const Box = styled.div`
	position: relative;
`;

const ArrowButton = styled(FontAwesomeIcon)`
	display: block;
	position: absolute;
	bottom: 12%;
	right: 2%;
	font-size: 1.4rem;
`;

export default UserInfo;
