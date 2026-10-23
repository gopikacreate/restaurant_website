// src/app/login/page.js
// The /login page: header, the form, footer.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="px-5 py-12 md:py-20">
        <AuthForm />
      </main>
      <Footer />
    </>
  );
}