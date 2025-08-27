import { AxiosInstance } from "./../AxiosInstance";
import { useQuery } from "@tanstack/react-query";

const useGetProductList = (
  search = "",
  sortBy = "title",
  order = "asc",
  page = 1,
  limit = 200
) => {
  const skip = (page - 1) * limit;

  return useQuery({
    queryKey: ["products", search, sortBy, order, page],
    queryFn: async () => {
      const response = await AxiosInstance.get(
        `/products/search?limit=${limit}&skip=${skip}&select=title,price,thumbnail&sortBy=${sortBy}&order=${order}&q=${search}`
      );
      return response.data;
    },
    keepPreviousData: true, // ✅ smooth transition between pages
  });
};

const useGetProductDetail = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await AxiosInstance.get(`products/${id}`);
      return res.data;
    },
  });
};

export { useGetProductList, useGetProductDetail };
