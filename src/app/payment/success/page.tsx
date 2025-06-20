// app/payment/success/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetProjectsCatchallQuery } from "@/feature/projectCreate/projectCreateSlice";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const router = useRouter();
  const { refetch } = useGetProjectsCatchallQuery("un");
  const loginClientId = localStorage.getItem("loginClientId") || "CLI001";

  useEffect(() => {
    // URL থেকে payment intent বা session ID পড়া
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    console.log("Session ID:", sessionId);

    if (sessionId) {
      // সার্ভারে পেমেন্ট স্ট্যাটাস যাচাই করতে API কল
      const verifyPayment = async () => {
        try {
          const response = await fetch(
            "https://taskflow-server-pi.vercel.app/api/payment/verify-session",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId, clientId: loginClientId }),
            }
          );
          const data = await response.json();

          if (response.ok && data.success) {
            toast.success("Payment successful!");
            // প্রজেক্ট স্ট্যাটাস আপডেট করতে refetch
            refetch();
          } else {
            toast.error("Payment verification failed.");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast.error("An error occurred while verifying payment.");
        }
      };

      verifyPayment();
    } else {
      toast.error("No session ID found.");
    }

    // ৫ সেকেন্ড পরে প্রজেক্ট পেজে ফিরে যাওয়া
    const timer = setTimeout(() => {
      router.push("/client");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router, refetch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-4">
          Thank you for your payment. We are verifying the transaction. You will
          be redirected to your projects page shortly.
        </p>
        <Button
          onClick={() => router.push("/client-projects")}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Go to Projects
        </Button>
      </div>
    </div>
  );
}
