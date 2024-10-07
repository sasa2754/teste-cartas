// Importes externos
import localFont from "next/font/local";
import { Karla } from "next/font/google";


// Importes internos
import "./globals.css";
import { Menu } from "@/components/menu";
// import { Menu } from "@/components/menu";
// import { Footer } from "@/components/footer";


const karla = Karla({
  weight: ["200", "400", "800"],
  style: ["normal"],
  variable: "--karla",
  subsets: ["latin"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.variable} antialiased bg-radial-custom bg-scroll overflow-x-hidden`}>
        <Menu
          op1="Home"
          op2="Fetch-Client"
          op3="Axios-Client"
          op4="Fetch-Server"
          op5="Fetch"
          op6="Axios"
          op7="server"
        />

        {children}

        {/* <Footer 
          // pag="Dragãozinho"
          contact={5541995213923}
        /> */}
      </body>
    </html>
  );
}
