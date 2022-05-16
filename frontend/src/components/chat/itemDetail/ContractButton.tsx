import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "src/store";

import { contractApi } from "src/api";

function ContractButton() {
  const { buyerId, sellerId } = useSelector((state: RootState) => state.articleInfo);

  console.log("buyerId : " + buyerId + "sellerId : " + sellerId );
	return <></>;
}

export default ContractButton;
