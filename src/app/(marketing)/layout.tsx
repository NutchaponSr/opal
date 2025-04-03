import { Header } from "./header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <>
      <Header />
      <main className="h-full flex-1 overflow-y-hidden">
        <div className="max-w-[1056px] mx-auto pt-16 h-full">
          {children}
        </div>
      </main>
    </>
  );
}

export default MarketingLayout;