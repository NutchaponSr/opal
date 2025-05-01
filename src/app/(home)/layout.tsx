import { Header } from "./header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <Header />
      <main className="flex flex-col items-center mx-auto mt-12 pt-14 md:mt-20 w-full px-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;