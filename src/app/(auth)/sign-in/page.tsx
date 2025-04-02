import { AuthCard } from "@/module/auth/components/auth-card";

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