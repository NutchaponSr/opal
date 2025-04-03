import { AuthCard } from "@/modules/auth/components/auth-card";
import { SignUpForm } from "@/modules/auth/components/sign-up-form";

const Page = () => {

  return (
    <AuthCard 
      title="Sign up"
      description="We just need a few details to get you started."
      backButtonHref="/sign-in"
      backButtonLabel="Already have an account?"
    >
      <SignUpForm />
    </AuthCard>
  );
};

export default Page;