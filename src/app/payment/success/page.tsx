"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isProcessed, setIsProcessed] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      console.log("useEffect already ran, skipping.");
      return;
    }

    if (!sessionId) {
      console.error("No session ID found");
      toast.error("No session ID found.");
      router.push("/error");
      return;
    }

    const confirmPayment = async () => {
      if (isProcessed) {
        console.log("Payment already processed, skipping.");
        return;
      }

      try {
        console.log(
          "Initiating payment confirmation for sessionId:",
          sessionId
        );
        const response = await fetch(
          `https://taskflow-server-pi.vercel.app/api/payment/confirm?sessionId=${sessionId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        console.log("Confirmation API Response:", {
          status: response.status,
          ok: response.ok,
          data,
        });

        if (response.ok && data.success) {
          toast.success("Payment confirmed successfully!");
          setIsProcessed(true);
          hasRun.current = true;
          setTimeout(() => {
            router.push("/client");
          }, 1000);
        } else {
          console.error("Confirmation failed:", {
            status: response.status,
            ok: response.ok,
            message: data.message || "No error message provided",
            errorSources: data.errorSources || [],
          });
          toast.error(
            data.message || "Payment confirmation failed. Please try again."
          );
          router.push("/error");
        }
      } catch (error) {
        console.error("Error confirming payment:", error);
        toast.error("An error occurred while confirming payment.");
        router.push("/error");
      }
    };

    hasRun.current = true;
    confirmPayment();
  }, [sessionId, router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Payment Processing</h1>
      <p>
        {isProcessed
          ? "Payment confirmed! Redirecting to client dashboard..."
          : "Validating your payment..."}
      </p>
    </div>
  );
};

export default SuccessPage;
