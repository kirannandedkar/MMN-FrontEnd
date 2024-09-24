import { AuthResult } from "@/app/types";
import Cookies from "js-cookie";

const handleCookie = (res_body: AuthResult) => {
  // add cookies to the response
  const option: Cookies.CookieAttributes = {
    httpOnly: false,
    path: "/",
    expires: 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  Cookies.set("access_token", res_body.accessToken, option);
  Cookies.set("refresh_token", res_body.refreshToken, option);
  Cookies.set("sub", res_body.sub, option);
};

const getAuthResultFromCookie = () => {
  const sub = Cookies.get("sub") ?? "";
  if (sub) {
    return {
      sub: sub,
      accessToken: Cookies.get("access_token") ?? "",
      refreshToken: Cookies.get("refresh_token") ?? "",
      expiredAt: "",
      refreshTokenExpiredAt: "",
    };
  }

  return null;
};

const clearCookie = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("sub");
};

const isOlder16 = (birth: string | undefined, age: number = 16) => {
  if (!birth) return false;
  return (Date.now() - Date.parse(birth)) / 1000 > age * 365 * 24 * 60 * 60;
};

const getYears = (startYear: number) => {
  const currentYear = getCurrentYear();

  // Generate an array of years from startYear to currentYear
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => (startYear + index).toString()
  );

  return years;
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const formatDate = (datetime: string | undefined): string => {
  if (datetime == null) return "";

  return datetime.split("T")[0];
};

interface Grouped<T> {
  [key: string]: T[];
}

function groupBy<T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Grouped<T> {
  return array.reduce((result: Grouped<T>, currentValue: T) => {
    const groupKey = currentValue[key] as string;

    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(currentValue);

    return result;
  }, {} as Grouped<T>);
}

export {
  isOlder16,
  handleCookie,
  formatDate,
  clearCookie,
  groupBy,
  getAuthResultFromCookie,
  getYears,
  getCurrentYear
};
