import axios from "axios";

export interface ITitle {
  id: string;
  title: string;
  parent_id: string | null;
}

export const getTitles = async (): Promise<ITitle[]> => {
  const response = await axios.get<ITitle[]>(
    `${process.env.VUE_APP_API_URL}/tree/items/`
  );
  return response.data;
};
