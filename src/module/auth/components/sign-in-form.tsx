"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Form 
} from "@/components/ui/form";

import { SignInSchema } from "../schema";

export const SignInForm = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver
  })

  return (
    <Form>
      
    </Form>
  );
}