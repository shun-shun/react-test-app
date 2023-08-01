import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../types/api/User";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";

export const useAuth = () => {
  const history = useNavigate();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const login = useCallback((userId: string) => {
    setLoading(true);

    axios
      .get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => {
        if (res.data) {
          showMessage({ title: "ログインしました", status: "success" });
          history("/home");
        } else {
          showMessage({ title: "ユーザが見つかりません", status: "error" });
        }
      })
      .catch((error) => {
        showMessage({ title: "ログインできません", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { login, loading };
};
