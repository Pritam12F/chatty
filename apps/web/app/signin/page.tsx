import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SignInForm } from "@/components/signin-form";

export default function SingInPage() {
  return (
    <div className="flex flex-col justify-center items-center bg-black">
      <Navbar />
      <SignInForm />
      <Footer />
    </div>
  );
}
