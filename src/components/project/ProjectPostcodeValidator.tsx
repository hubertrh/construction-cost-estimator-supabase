"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ProjectContent from "./ProjectContent";
import { Database } from "@/types/supabase";

export default function ProjectPostcodeValidator({
  fetchedProject,
}: {
  fetchedProject: Database["public"]["Tables"]["projects"]["Row"];
}) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const searchParams = useSearchParams();
  // const postcode = searchParams.get("postcode");
  const [postcode, setPostcode] = useState<string | null>(
    searchParams.get("postcode") ?? null,
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const formSchema = z.object({
    postcode: z
      .string()
      .min(1, {
        message: "Please enter correct project postcode",
      })
      .regex(
        new RegExp(/^([A-Z][A-HJ-Y]?\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/),
        {
          message: "Please enter a valid UK postcode",
        },
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postcode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUploading(true);

    setPostcode(values.postcode);
  }

  return postcode &&
    postcode.replace(/\s/g, "").toUpperCase() ===
      fetchedProject.project_postcode.replace(/\s/g, "").toUpperCase() ? (
    <ProjectContent fetchedProject={fetchedProject} />
  ) : (
    <div>
      <p>You are not signed in.</p>
      <p className="mb-8">
        Please enter the postcode of the project to continue.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="postcode"
            render={() => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      disabled={isUploading}
                      placeholder="EC1A 1BB"
                      onChange={(e) => {
                        if (
                          e.target.value.replace(/\s/g, "").toUpperCase() ===
                          fetchedProject.project_postcode
                            .replace(/\s/g, "")
                            .toUpperCase()
                        ) {
                          setPostcode(e.target.value);
                          router.push(
                            `/projects/${fetchedProject.id}?` +
                              createQueryString(
                                "postcode",
                                e.target.value.replace(/\s/g, "").toUpperCase(),
                              ),
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="aspect-square px-0"
                  >
                    <ChevronRight className="size-5" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
