import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col bg-black items-center justify-center">
      <Navbar />
      <SignUpForm />
      <Footer />
    </div>
  );
}
