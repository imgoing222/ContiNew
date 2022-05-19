import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import MenuItem from "./MenuItem";
import useOutside from "@hooks/useOutside";

interface IsToggle {
	isToggle?: boolean;
	on?: number;
}

function LeftSection() {
	const [isToggle, setIsToggle] = useState(false);
	const Ref = useRef<HTMLDivElement>(null);
	useOutside({ Ref, setFunction: setIsToggle as React.Dispatch<React.SetStateAction<boolean>> });
	const menu = [
		{ id: 1, name: "지도", address: "/saleList" },
		{ id: 2, name: "방내놓기", address: "/createSale" },
		{ id: 3, name: "계약", address: "/contract" },
	];

	return (
		<Container>
			<Menu isToggle={isToggle} ref={Ref}>
				<CloseButton icon={faX} onClick={() => setIsToggle(!isToggle)} on={isToggle ? 0 : 1} />
				{menu.map((item) => (
					<MenuItem key={item.id} item={item} setIsToggle={setIsToggle} />
				))}
			</Menu>
			<MenuBars icon={faBars} onClick={() => setIsToggle(!isToggle)} />
		</Container>
	);
}

const Container = styled.ul`
	width: 20%;
`;

const Menu = styled.div<IsToggle>`
	display: flex;
	align-items: center;

	@media ${(props) => props.theme.tabletS} {
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		background: #ffffff;
		width: 25rem;
		height: 66rem;
		justify-content: center;
		z-index: 1;
		transform: ${(props) => (props.isToggle ? "translateX(0)" : "translateX(-30rem)")};
		transition: ${(props) => props.isToggle && "all 0.35s"};
	}
`;

const MenuBars = styled(FontAwesomeIcon)`
	display: none;
	font-size: 2.5rem;
	cursor: pointer;
	margin: 0 auto 0 2rem;
	@media ${(props) => props.theme.tabletS} {
		display: block;
	}
`;

const CloseButton = styled(FontAwesomeIcon)<IsToggle>`
	font-size: 2rem;
	visibility: hidden;
	z-index: 3;
	color: #000;
	position: absolute;
	top: 2rem;
	left: 22rem;
	cursor: pointer;
	@media ${(props) => props.theme.tabletS} {
		visibility: ${(props) => (props.on ? "hidden" : "visible")};
	}
`;

export default LeftSection;
