import { BACKEND_ROOT_URL } from "../constants";
import { apiClient } from "./constant.service";

export const AddProduct = async (body) => {
  const { data } = await apiClient.post(
    `${BACKEND_ROOT_URL}/product/add-product`,
    body
  );
  return data;
};
console.log(BACKEND_ROOT_URL);

export const checkIfProductIsSold = async (data) => {
  const res = await apiClient.post(
    `${BACKEND_ROOT_URL}/product/check-if-product-is-sold`,
    data
  );
  return res;
};
