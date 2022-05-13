import { noop } from "lodash";
import ReactSlider from "react-slider";
import React, {
	ChangeEvent,
	InputHTMLAttributes,
	ReactElement,
	useCallback,
	useState,
} from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	value?: number;
	minValue?: number;
	maxValue?: number;
	color?: string;
	label?: {
		min: string;
		max: string;
		mid?: string;
	};
	tooltip?: ReactElement;
	onChange?: (value: number) => void;
}

function Slider({
	min = 0,
	max = 100,
	minValue = Number(min),
	maxValue = Number(max),
	value: outerValue = (minValue + maxValue) / 2,
	color,
	tooltip,
	label,
	onChange = noop,
}: Props) {
	const [value, setValue] = useState({ min: minValue, max: maxValue });

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const val = Number(event.target.value);
			setValue({ ...value, [event.target.name]: val });
			onChange?.(val);
		},
		[onChange],
	);
	return (
		<div>
			<input
				type="range"
				value={value.min}
				min={minValue}
				max={maxValue}
				onChange={handleChange}
				step={value.min < 50 ? "10" : "50"}
				name="min"
			/>
			<div>
				<div>slider</div> <div>ragne</div>{" "}
				<div>
					<label htmlFor="max">최대값</label>
				</div>
				<div>max</div>
			</div>
			<input
				type="range"
				value={value.max}
				min={minValue}
				max={maxValue}
				onChange={handleChange}
				step={value.max < 50 ? "10" : "50"}
				name="max"
				id="max"
			/>

			{label !== undefined && (
				<>
					<p>{label.min}</p>
					<p>{label.max}</p>
				</>
			)}
		</div>
	);
}

export default Slider;
