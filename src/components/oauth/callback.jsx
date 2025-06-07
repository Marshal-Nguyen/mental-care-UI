import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../Supabase/supabaseClient";
import axios from "axios";
import { toast } from "react-toastify";

import { jwtDecode } from "jwt-decode";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokenAndCallBE = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session) {
        toast.error("Đăng nhập thất bại!");
        return;
      }

      const access_token = data.session.access_token;

      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/google/callback",
          {
            access_token,
          }
        );

        const jwtToken = res.data.token;
        localStorage.setItem("token", jwtToken);

        // 👉 Decode JWT để lấy role, user_id
        const decoded = jwtDecode(jwtToken);
        const { role, user_id, profileId } = decoded;

        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", user_id);
        localStorage.setItem("profileId", profileId);

        toast.success("Đăng nhập thành công!");
        navigate("/EMO/learnAboutEmo");
      } catch (err) {
        toast.error("Lỗi xác thực phía backend!");
      }
    };

    fetchTokenAndCallBE();
  }, []);

  return <p>Đang xử lý đăng nhập...</p>;
};

export default OAuthCallback;
