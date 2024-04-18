"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { CloudUpload, Loader2, Plus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
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
import { formSchema } from "@/components/estimateRequestForm/formSchema";

export function EstimateRequestForm() {
  const [newProjectID, setNewProjectID] = useState("");
  const [projectReference, setProjectReference] = useState("");
  const [refCopyStatus, setRefCopyStatus] = useState("");
  const [refHoverStatus, setRefHoverStatus] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileInputs, setFileInputs] = useState([1]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileProgress, setFileProgress] = useState<Record<number, number>>({});
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
      projectStreetAddress: "",
      projectCity: "",
      projectPostcode: "",
      projectDescription: "",
      desiredOHP: undefined,
      contractorsCustomPreliminaries: "",
      files: [],
    },
  });

  const handleProjectReferenceCopy = () => {
    navigator.clipboard.writeText(projectReference);
    setRefCopyStatus("copied");
    setTimeout(() => {
      setRefCopyStatus("");
    }, 1000);
  };

  const handleHover = () => {
    setRefHoverStatus(!refHoverStatus);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUploading(true);
    const folderName = `${projectReference}-${values.projectName}`.replace(
      /\s/g,
      "-",
    );
    const folderID = await createGoogleDriveFolder(folderName);

    files.forEach((file, index) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name.replace(/\s/g, "-"));
      formData.append("fileType", file.type);
      formData.append("folderID", folderID);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/uploadFile", true);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 80);
          setFileProgress((prev) => ({ ...prev, [index]: percentComplete }));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response.message);
          console.log("Uploaded file ID:", response.fileID);
          setFileProgress((prev) => ({ ...prev, [index]: 100 }));
          setFileUploadSuccess((prev) => ({ ...prev, [index]: true }));
        } else {
          console.error("Failed to upload file:", file.name, xhr.statusText);
        }
      };

      xhr.onerror = () => {
        console.error("Error uploading file:", file.name);
      };

      xhr.send(formData);
    });
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
          {projectReference ? (
            <Badge
              className="w-20 cursor-pointer text-center uppercase"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              onClick={handleProjectReferenceCopy}
            >
              {refCopyStatus === "copied"
                ? "Copied"
                : refHoverStatus
                  ? "Copy"
                  : projectReference}
            </Badge>
          ) : (
            <Badge className="uppercase">Loading</Badge>
          )}
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-xl">Your details</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
              <FormLabel>Email</FormLabel>
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
        <div className="h-2 w-full" />
        <h2 className="text-xl">Project details</h2>
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
          name="projectStreetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input
                  disabled={isUploading}
                  placeholder="123 Example Street"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-4">
          <div className="grow">
            <FormField
              control={form.control}
              name="projectCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isUploading}
                      placeholder="London"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-32">
            <FormField
              control={form.control}
              name="projectPostcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isUploading}
                      placeholder="EC1A 1BB"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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
                <div className="flex items-center">
                  <p className="mx-2 font-semibold">%</p>
                  <Input disabled={isUploading} placeholder="20" {...field} />
                </div>
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
                  <div className="flex flex-col">
                    <div className="relative flex items-center">
                      {isUploading && !fileUploadSuccess[index] && (
                        <div
                          className={`absolute right-0 top-1/2 -translate-y-1/2 ${index === fileInputs.length - 1 && fileInputs.length > 1 ? "mr-[3.7rem]" : "mr-4"}
                        `}
                        >
                          <Loader2 className="size-5 animate-spin" />
                        </div>
                      )}
                      <Input
                        disabled={isUploading}
                        type="file"
                        required
                        className={`h-fit text-xs file:mr-4 file:rounded file:bg-accent-secondary file:px-3 file:py-2 file:text-white file:transition-all file:duration-200 file:hover:scale-[103%] file:hover:shadow ${
                          fileUploadSuccess[index]
                            ? "file:bg-white file:text-black disabled:bg-green-500/40"
                            : ""
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
                          setFileProgress((prev) => ({
                            ...prev,
                            [index]: 0,
                          }));
                        }}
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
                    <div className="mx-px">
                      <Progress value={fileProgress[index] || 0} />
                    </div>
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
          {isUploading ? (
            Object.values(fileUploadSuccess).every(Boolean) ? (
              <>
                <Button disabled className="mt-10 text-base">
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Finalising...
                </Button>
                <p className="mt-2 animate-pulse text-sm italic">
                  This may take a while, please do not close the page...
                </p>
              </>
            ) : (
              <>
                <Button disabled className="mt-10 text-base">
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Uploading...
                </Button>
                <p className="mt-2 animate-pulse text-sm italic">
                  This may take a while, please do not close the page...
                </p>
              </>
            )
          ) : (
            <Button className="mt-10 text-base" type="submit">
              <CloudUpload className="mr-2 size-4" />
              Submit Form
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
