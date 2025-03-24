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
        // Lấy query parameters từ URL
        const queryParams = new URLSearchParams(location.search);

        // Lấy tất cả các tham số từ URL
        const paymentData = {
          amount: queryParams.get("vnp_Amount"),
          bankCode: queryParams.get("vnp_BankCode"),
          bankTranNo: queryParams.get("vnp_BankTranNo"),
          cardType: queryParams.get("vnp_CardType"),
          orderInfo: queryParams.get("vnp_OrderInfo"),
          payDate: queryParams.get("vnp_PayDate"),
          responseCode: queryParams.get("vnp_ResponseCode"),
          tmnCode: queryParams.get("vnp_TmnCode"),
          transactionNo: queryParams.get("vnp_TransactionNo"),
          transactionStatus: queryParams.get("vnp_TransactionStatus"),
          txnRef: queryParams.get("vnp_TxnRef"),
          secureHash: queryParams.get("vnp_SecureHash"),
        };

        // Gửi request tới backend với toàn bộ query params
        await axios.get(
          `https://psychologysupport-payment.azurewebsites.net/payments/callback?${queryParams.toString()}`
        );

        // Kiểm tra kết quả thanh toán
        if (
          paymentData.responseCode === "00" &&
          paymentData.transactionStatus === "00"
        ) {
          // Chuyển hướng đến trang thành công với dữ liệu cần thiết
          navigate("/EMO/payment-success", {
            state: {
              transactionNo: paymentData.transactionNo,
              amount: paymentData.amount,
              payDate: paymentData.payDate,
            },
          });
        } else {
          // Chuyển hướng đến trang thất bại với thông tin lỗi
          navigate("/EMO/payment-failure", {
            state: {
              responseCode: paymentData.responseCode,
              message: getVNPayErrorMessage(paymentData.responseCode),
            },
          });
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

  // Hàm lấy thông báo lỗi từ mã lỗi VNPay
  const getVNPayErrorMessage = (responseCode) => {
    const errorMessages = {
      24: "Transaction canceled by customer",
      51: "Insufficient account balance",
      65: "Transaction limit exceeded for the day",
      75: "Payment bank under maintenance",
      99: "Unknown error",
      "02": "Transaction failed",
    };
    return errorMessages[responseCode] || "Transaction failed";
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
