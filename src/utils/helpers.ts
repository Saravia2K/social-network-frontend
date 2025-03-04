import { SxProps } from "@mui/material";
import { TErrorResponse } from "./types";

export const createSxStyles = <T extends Record<string, SxProps>>(
  styles: T
): T => {
  return styles;
};

type TReturn<T> =
  | {
      success: false;
      message: string;
    }
  | ({
      success: true;
    } & T);
export const basicFetch = async <
  R,
  T,
  SDR extends Record<string, string | number | R>
>(
  url: string,
  method: string,
  body: T,
  successData?: (data: R) => SDR
): Promise<TReturn<SDR>> => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const isOk = response.ok;
  const data = await response.json();
  if (!isOk) {
    const { message } = data as TErrorResponse;
    return {
      success: false,
      message,
    };
  }

  const responseData = data as R;
  const extraData = (successData && successData(responseData)) || ({} as SDR);
  return {
    success: true,
    ...extraData,
  };
};
