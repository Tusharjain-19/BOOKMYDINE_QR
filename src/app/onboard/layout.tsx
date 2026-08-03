import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Your Free QR Menu Setup — Restaurant Intake Form",
  description:
    "Submit your restaurant details and menu to BookMyDine QR. Our team will design your custom digital QR menu for free within 24-48 hours. No credit card required. Plans start at ₹99/month.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
