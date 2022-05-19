import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setHouseType } from "src/store/searchFilter";
import styled from "styled-components";
import Container from "./Container";
import { Input, Label, SmallBox, Title } from "./PriceTab";

function RoomType() {
	const dispatch = useDispatch();

	const [roomType, setRoomType] = useState("전체");
	const changeRoomTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, id } = e.target;
		console.log(roomType);
		console.log(id);
		if (id === roomType) {
			setRoomType("");
			return chagneRedux("전체");
		}
		if (id === "전체") {
			setRoomType("전체");
			return chagneRedux("");
		}
		if (roomType === "") {
			setRoomType(id);
			return chagneRedux(id);
		}
		setRoomType(id);
		return chagneRedux(id);
	};
	const chagneRedux = (str: string) => {
		dispatch(setHouseType({ houseType: str }));
	};
	return (
		<Container title="방 종류" width={20} isPrice="room">
			<SmallBox>
				<Title>방 종류</Title>
				<Tab>
					<InputBox>
						<Input
							type="checkbox"
							id="원룸"
							checked={roomType === "전체" || roomType === "원룸"}
							onChange={changeRoomTypeHandler}
						/>
						<Label htmlFor="원룸" style={{ cursor: "pointer" }}>
							원룸
						</Label>
					</InputBox>
					<InputBox>
						<Input
							type="checkbox"
							id="투룸"
							checked={roomType === "전체" || roomType === "투룸"}
							onChange={changeRoomTypeHandler}
						/>
						<Label htmlFor="투룸" style={{ cursor: "pointer" }}>
							투룸
						</Label>
					</InputBox>
					<InputBox>
						<Input
							type="checkbox"
							id="쓰리룸"
							checked={roomType === "전체" || roomType === "쓰리룸"}
							onChange={changeRoomTypeHandler}
						/>
						<Label htmlFor="쓰리룸" style={{ cursor: "pointer" }}>
							쓰리룸
						</Label>
					</InputBox>
					<InputBox>
						<Input
							type="checkbox"
							id="전체"
							checked={roomType === "전체"}
							onChange={changeRoomTypeHandler}
						/>
						<Label htmlFor="전체" style={{ cursor: "pointer" }}>
							전체
						</Label>
					</InputBox>
				</Tab>
			</SmallBox>
		</Container>
	);
}

export default RoomType;

const Tab = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;
`;

const InputBox = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
`;
