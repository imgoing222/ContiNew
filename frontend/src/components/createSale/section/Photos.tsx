import { useState } from "react";
import { EventProps } from "src/pages/createSale";
import styled from "styled-components";
import Layout from "../Layout";
import Title from "../Title";

interface ContainerProps {
	height?: number;
	background?: boolean;
	border?: boolean;
	grid?: boolean;
}

interface DivProps {
	isImgs?: boolean;
	hide?: boolean;
}

function Photos({ houseInfo, changeEvent, setHouseInfo }: EventProps) {
	const [uploadImgs, setUploadImgs] = useState<FileList | null>(null);
	const [previewImgs, setPreviewImgs] = useState<string[]>([]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedImages = e.target.files;
		if (uploadImgs) setUploadImgs({ ...uploadImgs, ...selectedImages });
		if (setHouseInfo) setHouseInfo({ ...houseInfo, images: uploadImgs });

		const imgs: string[] = [];
		if (selectedImages) {
			[...selectedImages].forEach((img) => imgs.push(URL.createObjectURL(img)));
			if (imgs.length > 10) imgs.splice(0, 9);
			setPreviewImgs([...previewImgs, ...imgs]);
		}
	};

	const DeletePhoto = (idx: number) => {
		previewImgs.splice(idx, 1);
		setPreviewImgs([...previewImgs]);
	};

	return (
		<Layout>
			<Title>사진 등록</Title>
			<Container>
				<Text>- 사진은 최소 3장 최대 10장 까지 업로드가 가능합니다.</Text>
				<Text>- 사진 용량은 최대 100MB까지 가능합니다.</Text>
				<Text>- 사진은 가로로 찍은 사진을 권장합니다.</Text>
			</Container>
			<Container height={32} background={true} grid={true}>
				{previewImgs.length > 0 &&
					previewImgs.map((img, idx) => (
						<PhotoDiv key={idx + 100}>
							<PreviewImg src={img} alt="" />
							<DeleteButton key={idx} onClick={() => DeletePhoto(idx)}>
								X
							</DeleteButton>
						</PhotoDiv>
					))}
				<Div isImgs={previewImgs.length > 0 && true} hide={previewImgs.length >= 10 && true}>
					<Label isImgs={previewImgs.length > 0 && true} htmlFor="images">
						사진 추가하기
					</Label>
					<Input type="file" id="images" multiple accept="image/*" onChange={handleImageChange} />
				</Div>
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
	display: ${({ grid }) => grid && "grid"};
	grid-template-columns: repeat(5, 1fr);
`;

const Text = styled.p`
	font-size: 1.3rem;
`;

const Div = styled.div<DivProps>`
	display: ${({ hide }) => hide && "none"};
	width: 20rem;
	height: 12rem;
	cursor: pointer;
	background-color: rgba(244, 244, 244);
	border: 3px solid #fff;
	font-size: 1.3rem;
	font-weight: 800;
	margin-right: 2.5rem;
	margin-bottom: 2rem;
	${(props) =>
		!props.isImgs &&
		`
    border: none;
    width: 12rem;
    height:5rem;
    position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
  background-color: ${props.theme.mainColor};
  color: #fff;
  border-radius: 0.5rem;
  margin:0;
  `}
`;

const Label = styled.label<DivProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	${(props) =>
		!props.isImgs &&
		`
    border: none;
  color: #fff;
  border-radius: 0.5rem;
  `}
`;

const Input = styled.input`
	display: none;
`;

const PreviewImg = styled.img`
	width: 20rem;
	height: 12rem;
`;

const PhotoDiv = styled.div`
	width: 20rem;
	height: 12rem;
	margin-bottom: 3rem;
	position: relative;
`;

const DeleteButton = styled.button`
	position: absolute;
	top: -1rem;
	right: -1rem;
	cursor: pointer;
`;
