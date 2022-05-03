import DivBox from "./DivBox";
import { Td, Ul } from "./TableRow";

interface LocationTableDataProps {
	children: React.ReactNode;
}

function LocationTableData({ children }: LocationTableDataProps) {
	return (
		<Td>
			<Ul>
				<li>
					<DivBox>{children}</DivBox>
				</li>
			</Ul>
		</Td>
	);
}

export default LocationTableData;
