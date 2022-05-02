import { useEffect, useRef, useState } from "react";

function Timer() {
	const [min, setMin] = useState(3);
	const [sec, setSec] = useState(0);
	const time = useRef(180);
	const timerId = useRef<any>(null);

	useEffect(() => {
		timerId.current = setInterval(() => {
			setMin(time.current / 60);
			setSec(time.current % 60);
			time.current -= 1;
		}, 1000);

		return () => clearInterval(timerId.current);
	}, []);

	useEffect(() => {
		if (time.current <= 0) {
			alert("타임 아웃");
			clearInterval(timerId.current);
		}
	}, [sec]);

	return (
		<div>
			{min} 분 {sec} 초
		</div>
	);
}

export default Timer;
