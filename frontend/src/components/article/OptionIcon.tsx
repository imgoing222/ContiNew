import Image from "next/image";

interface OptionProps {
	name: string;
	fileName: string;
}

function OptionIcon({ name, fileName }: OptionProps) {
	return (
		<div>
			<Image src={`/${fileName}.svg`} width="100" height="100" alt="me" />
			<p>{name}</p>
		</div>
	);
}

export default OptionIcon;
