"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "test" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Create a new document...",
      success: "New Document Created!",
      error: "Failed to create a new document...",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Image
        src="/document.png"
        height="300"
        width="300"
        alt="document-image"
        className="dark:hidden"
      />
      <Image
        src="/document-dark.png"
        height="300"
        width="300"
        alt="document-image"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium dark:text-white">
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create a document
      </Button>
    </div>
  );
};

export default DocumentsPage;
