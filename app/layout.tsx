import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import "svgmap/dist/svgMap.min.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SessionTimeoutWrapper from "@/components/SessionTimeoutWrapper";
import Providers from "@/Providers";
import SessionProvider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Calligadh",
	description: "E-Commerce",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();
	return (
		<html lang="en" data-theme="light">
			<body className={inter.className}>
				<SessionProvider session={session}>
					<SessionTimeoutWrapper />
					<Header />
					<Providers>{children}</Providers>
					<Footer />
				</SessionProvider>
			</body>
		</html>
	);
}
