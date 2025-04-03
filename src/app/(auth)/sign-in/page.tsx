import { AuthCard } from "@/modules/auth/components/auth-card";
import { SignInForm } from "@/modules/auth/components/sign-in-form";

const Page = () => {

  return (
    <AuthCard 
      title="Sign in"
      description="Enter your credentials to login to your account."
      backButtonHref="/"
      backButtonLabel="Back to page"
    >
      <SignInForm />
    </AuthCard>
  );
};

export default Page;