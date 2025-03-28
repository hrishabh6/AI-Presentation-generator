"use client";
import { deleteAllProjects } from "@/actions/project";
import AlertDialogBox from "@/components/global/alert-dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";



interface DeleteAllButtonProps {
  Projects: Project[];
}

const DeleteAllButton = ({ Projects }: DeleteAllButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

    

  const handleDeleteAllProjects = async () => {
    setLoading(true);
    
    if (!Projects || Projects.length === 0) {
      setLoading(false);
      toast.error("Error",{
        description: "No projects found",
      });
      
    }
    try {
      const response = await deleteAllProjects(Projects.map((project) => project.id));
      if (response.status !== 200) {
        throw new Error("Failed to delete all projects");
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("ERROR:",{  
        description: "Failed to delete all projects",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <AlertDialogBox
      description="This action cannot be undone.This will permanently delete all your porject aand remove your data"
      className="bg-red-600 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
      onClick={handleDeleteAllProjects}
      loading={loading}
      handleOpen={() => setOpen(!open)}
      open={open}
    >
      <Button
        size={"lg"}
        className="bg-background-80 rounded-lg dark:hover:bg-background-90 text-primary font-semibold hover:text-white"
      >
        <Trash />
        Delete All
      </Button>
    </AlertDialogBox>
  );
};

export default DeleteAllButton;