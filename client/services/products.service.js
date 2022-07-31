import { BACKEND_ROOT_URL } from "../constants";
import { apiClient } from "./constant.service";

export const AddProduct = async (body) => {
  const { data } = await apiClient.post(
    `${BACKEND_ROOT_URL}/product/add-product`,
    body
  );
  return data;
};

export const checkIfProductIsSold = async (data) => {
  const res = await apiClient.post(
    `${BACKEND_ROOT_URL}/product/check-if-product-is-sold`,
    data
  );
  return res;
};

export const getAllProductNames = async () => {
  const res = await apiClient.get(
    `${BACKEND_ROOT_URL}/product/get-all-product-names`
  );
  return res;
};

export const AddSoldProduct = async (body) => {
  const res = await apiClient.post(
    `${BACKEND_ROOT_URL}/product/record-sold-product`,
    body
  );
  return res;
};
