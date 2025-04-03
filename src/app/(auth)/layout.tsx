interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#f8f8f7]">
      {children}
    </main>
  );
}

export default AuthLayout;