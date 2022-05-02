import React, { useState } from "react";
import { EventProps } from "src/pages/createSale";
import styled from "styled-components";
import Layout from "./Layout";
import Title from "./Title";

interface ContainerProps {
	height?: number;
	background?: boolean;
	border?: boolean;
}

function Photos({ houseInfo, changeEvent, setHouseInfo }: EventProps) {
	const [previewImgs, setPreviewImgs] = useState<string[]>([]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedImages = e.target.files;
		if (setHouseInfo) setHouseInfo({ ...houseInfo, images: selectedImages });

		const imgs = [];
		if (selectedImages) {
			for (let i = 0; i < selectedImages.length; i++) {
				imgs.push(URL.createObjectURL(selectedImages[i]));
			}
			if (imgs.length > 10) imgs.splice(0, 9);
			setPreviewImgs(imgs);
		}
	};

	return (
		<Layout>
			<Title>사진 등록</Title>
			<Container>
				<Text>- 사진은 최소 3장 최대 10장 까지 업로드가 가능합니다.</Text>
				<Text>- 사진 용량은 최대 100MB까지 가능합니다.</Text>
				<Text>- 사진은 가로로 찍은 사진을 권장합니다.</Text>
			</Container>
			<Container height={32} background={true}>
				{previewImgs && previewImgs.map((img) => <PreviewImg src={img} alt="" />)}
				<Button htmlFor="images">사진 업로드하기</Button>
				<Input type="file" id="images" multiple accept="image/*" onChange={handleImageChange} />
			</Container>
		</Layout>
	);
}

export default Photos;

const Container = styled.div<ContainerProps>`
	width: calc(100% - 2rem);
	height: ${({ height }) => (height ? `${height}rem` : "auto")};
	margin: 1rem;
	padding: 2rem;
	border: ${(props) => (props.background ? "none" : `1px solid ${props.theme.borderColor}`)};
	background-color: ${({ background }) => (background ? `rgb(244,244,244)` : "none")};
	position: relative;
`;

const Text = styled.p`
	font-size: 1.3rem;
`;

const Button = styled.label`
	width: 12rem;
	height: 4rem;
	cursor: pointer;
	background-color: ${(props) => props.theme.mainColor};
	border: none;
	border-radius: 0.5rem;
	font-size: 1.3rem;
	font-weight: 800;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Input = styled.input`
	display: none;
`;

const PreviewImg = styled.img`
	width: 20rem;
	height: 12rem;
	margin-right: 2.5rem;
	margin-bottom: 2.5rem;
`;