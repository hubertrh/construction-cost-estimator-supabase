"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createGoogleDriveFolder } from "@/app/api/createGoogleDriveFolder";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(64, {
      message: "Name must be at most 64 characters.",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .min(1, {
      message: "Please enter an email address.",
    }),
  projectName: z.string().min(1, {
    message: "Please enter a project name.",
  }),
  projectDescription: z.string(),
  desiredOHP: z.string().min(1, {
    message: "Please enter a desired OHP.",
  }),
  contractorsCustomPreliminaries: z.string(),
  files: z.array(z.any()),
});

export function EstimateRequestForm() {
  const [newProjectID, setNewProjectID] = useState("");
  const [projectReference, setProjectReference] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileInputs, setFileInputs] = useState([1]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileUploadSuccess, setFileUploadSuccess] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    let id = crypto.randomUUID();
    setNewProjectID(id);
    setProjectReference(id.slice(-6));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectName: "",
      projectDescription: "",
      desiredOHP: "",
      contractorsCustomPreliminaries: "",
      files: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUploading(true);

    const folderName = `${projectReference}-${values.projectName}`.replace(
      /\s/g,
      "-",
    );
    const folderID = await createGoogleDriveFolder(folderName);

    // Sequentially upload each file
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      let formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name.replace(/\s/g, "-"));
      formData.append("fileType", file.type);
      formData.append("folderID", folderID);

      try {
        const response = await fetch("/api/uploadFile", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          console.error(
            "Failed to upload file (skipping):",
            file.name,
            response.statusText,
          );
          continue; // Skip to the next file if the current one fails
        }

        const uploadResult = await response.json();
        console.log(uploadResult.message);
        console.log("Uploaded file ID:", uploadResult.fileID);

        setFileUploadSuccess((prev) => ({ ...prev, [index]: true }));
      } catch (error) {
        console.error("Error uploading file:", file.name, error);
      }
    }
  }

  function addFileInput() {
    setFileInputs((inputs) => [...inputs, inputs.length + 1]);
  }

  function removeLastFileInput() {
    const newFiles = files.slice();
    newFiles.pop();
    setFiles(newFiles);

    const newFileInputs = fileInputs.slice();
    newFileInputs.pop();
    setFileInputs(newFileInputs);
  }

  return (
    <Form {...form}>
      <div className="mb-8 flex min-w-[28rem] items-center justify-between gap-8">
        <h1 className="text-2xl font-bold">New Estimate Request</h1>
        <div className="flex items-center gap-2">
          <p className="mt-1 text-gray-500">Ref:</p>
          {projectReference && (
            <Badge className="uppercase">{projectReference}</Badge>
          )}
          {!projectReference && <Badge className="uppercase">Loading</Badge>}
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isUploading}
                  placeholder="Jane Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isUploading}
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isUploading}
                  placeholder="Project X"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isUploading}
                  placeholder="Any information not contained in the attachments"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desiredOHP"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desired OHP</FormLabel>
              <FormControl>
                <Input
                  disabled={isUploading}
                  placeholder="£100,000"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contractorsCustomPreliminaries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contractor&apos;s Custom Preliminaries</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isUploading}
                  placeholder="Any custom preliminaries to be included in the estimate"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fileInputs.map((input, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`files.${index}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project File {index + 1}</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      disabled={isUploading}
                      type="file"
                      className={`h-fit text-xs file:mr-4 file:rounded file:bg-accent-secondary file:px-3 file:py-2 file:text-white file:transition-all file:duration-200 file:hover:scale-[103%] file:hover:shadow ${
                        fileUploadSuccess[index] ? "disabled:bg-green-200" : ""
                      }`}
                      onChange={(event) => {
                        const newFiles = [...files];
                        if (event.target.files!.length > 0) {
                          newFiles[index] = event.target.files![0];
                        }
                        setFiles(newFiles);
                        setFileUploadSuccess((prev) => ({
                          ...prev,
                          [index]: false,
                        }));
                      }}
                      // {...field}
                    />
                    {index === fileInputs.length - 1 &&
                      fileInputs.length > 1 && (
                        <Button
                          disabled={isUploading}
                          variant="destructive"
                          size="icon"
                          type="button"
                          onClick={() => removeLastFileInput()}
                          className="ml-2 aspect-square h-9"
                        >
                          <X className="size-5" />
                        </Button>
                      )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={isUploading}
          variant={"outline"}
          type="button"
          onClick={addFileInput}
        >
          <Plus className="mr-2 size-4" /> Add Another File
        </Button>
        <div className="w-full">
          {isUploading && (
            <>
              <Button disabled className="mt-10 text-base">
                <Loader2 className="mr-2 size-4 animate-spin" />
                Uploading...
              </Button>
              <p className="mt-2 animate-pulse text-sm italic">
                This may take a while, please do not close the page...
              </p>
            </>
          )}
          {!isUploading && (
            <Button className="mt-10 text-base" type="submit">
              Submit Form
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
