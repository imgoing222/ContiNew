import { useEffect } from "react";

interface Props<T> {
	Ref: React.RefObject<T>;
	setFunction: React.Dispatch<React.SetStateAction<boolean>>;
	setSecondFunction?: React.Dispatch<React.SetStateAction<string>>;
}

function useOutside({ Ref, setFunction, setSecondFunction }: Props<HTMLElement>) {
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (Ref.current && !Ref.current.contains(e.target as Node)) {
				setFunction(false);
				if (setSecondFunction !== undefined) setSecondFunction("");
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [Ref]);
}

export default useOutside;
