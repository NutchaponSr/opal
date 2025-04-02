import Link from "next/link";
import Image from "next/image";

import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AuthCardProps {
  children: React.ReactNode;
  description: string;
  backButtonLabel: string;
  backButtonHref: string;
  title: string;
}

export const AuthCard = ({
  children,
  description,
  backButtonLabel,
  backButtonHref,
  title
}: AuthCardProps) => {
  return (
    <Card className="min-w-100 shadow-md">
      <CardHeader>
       <div className="w-full flex flex-col gap-2 items-center justify-center">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <h1 className="text-primary font-semibold text-lg">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm font-light">
            {description}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        { children }
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="w-full font-normal"
          variant={'link'}
          size={'sm'}
        >
          <Link href={backButtonHref}>
            {backButtonLabel}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  ); 
}