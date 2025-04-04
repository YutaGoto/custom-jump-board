import { GlobalLayout } from "@/components/GlobalLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GlobalLayout>{children}</GlobalLayout>;
}
