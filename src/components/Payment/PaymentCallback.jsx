import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentCallback = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const processPaymentResult = async () => {
      try {
        // Get query parameters from URL
        const queryParams = new URLSearchParams(location.search);

        // Collect PayOS-specific parameters
        const paymentData = {
          code: queryParams.get("code"),
          id: queryParams.get("id"),
          cancel: queryParams.get("cancel") === "true",
          status: queryParams.get("status"),
          orderCode: queryParams.get("orderCode"),
          // amount: queryParams.get("amount"),
          // description: queryParams.get("description"),
          // transactionDate: queryParams.get("transactionDate"),
          // checksum: queryParams.get("checksum"),
        };

        // Send callback parameters to backend for initial processing
        // await axios.get(
        //   `https://anhtn.id.vn/payment-service/payments/callback?${queryParams.toString()}`,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   }
        // );

        // Verify payment status using BE's link-information endpoint
        const linkInfoResponse = await axios.get(
          `https://anhtn.id.vn/payment-service/payments/payos/link-information/${paymentData.orderCode}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const linkInfo = linkInfoResponse.data;
        console.log("Link Information:", linkInfo);
        // Check payment result based on status
        if (linkInfo.status === "PAID") {
          // Redirect to success page
          navigate("/EMO/payment-success", {
            state: {
              transactionId: linkInfo.id,
              amount: linkInfo.amount,
              transactionDate: linkInfo.transactionDate || linkInfo.createdAt,
            },
          });
          console.log("Link Information:", linkInfo);
        } else if (linkInfo.status === "CANCELLED") {
          // Redirect to failure page for cancelled transactions
          navigate("/EMO/payment-failure", {
            state: {
              code: linkInfo.code,
              message: "Giao dịch đã bị hủy",
            },
          });
          console.log("Link Information:", linkInfo);
        } else {
          // Redirect to failure page for other errors
          navigate("/EMO/payment-failure", {
            state: {
              code: linkInfo.code,
              message: getPayOSErrorMessage(linkInfo.code),
            },
          });
          console.log("Link Information:", linkInfo);
        }
      } catch (error) {
        console.error("Error processing payment callback:", error);
        navigate("/EMO/payment-failure", {
          state: { error: "Đã xảy ra lỗi khi xử lý kết quả thanh toán" },
        });
      } finally {
        setLoading(false);
      }
    };

    processPaymentResult();
  }, [location.search, navigate]);

  // Function to get error message from PayOS error code
  const getPayOSErrorMessage = (code) => {
    const errorMessages = {
      "00": "Giao dịch thành công", // Handle BE's custom code=00
      "01": "Dữ liệu không hợp lệ",
      "02": "Giao dịch thất bại",
      "03": "Lỗi hệ thống",
      "04": "Thông tin thanh toán không khớp",
      "05": "Giao dịch đã tồn tại",
      99: "Lỗi không xác định",
    };
    return errorMessages[code] || "Giao dịch thất bại";
  };

  return (
    <div className="payment-callback-container">
      {loading && (
        <div className="loading">Đang xử lý kết quả thanh toán...</div>
      )}
    </div>
  );
};

export default PaymentCallback;
