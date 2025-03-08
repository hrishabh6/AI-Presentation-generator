"use client"
//uncomment the necessary lines to get the thumbnail preview running
import React from 'react'
import { motion } from "framer-motion";
import { itemVariants } from '@/lib/constants';
// import { themes } from '@/lib/constants';
import { useSlideStore } from '@/store/useSlideStore';
import { useRouter } from 'next/navigation';
// import ThumbnailPreview from './thumbnail-preview';
import { JsonValue } from '@prisma/client/runtime/library';
import { timeAgo } from '@/lib/utils';
import AlertDialogBox from '../alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteProject, recoverProject } from '@/actions/project';

interface ProjectCardProps {
  projectId: string;
  title: string;
  createdAt: Date | null;
  isDelete: boolean | null;
  slideData: JsonValue;
  themeName: string | null;
}


const ProjectCard = ({
  projectId,
  title,
  createdAt,
  isDelete,
  slideData,
  // themeName,
}: ProjectCardProps) => {

  const { setSlides } = useSlideStore()
  const router = useRouter()

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)))
    router.push(`/presentation/${projectId}`)
  }

  const handleRecover = async () => {
    setLoading(true)
    if (!projectId) {
      setLoading(false)
      toast.error("Error", {
        description: "Project ID not found",
      })
      return
    }
    try {
      const response = await recoverProject(projectId)
      if (response.status === 200) {
        setOpen(false)
        router.refresh()
        toast.success("Success", {
          description: "Project recovered successfully",
        })
      } else {
        toast.error("OOPS!", {
          description: response.error || "Something went wrong. Please try again later",
        })
        return
      }

    } catch (error) {
      console.log("Error in handleRecover", error)
      toast.error("OOPS!", {
        description: "Something went wrong. Please try again later",
      })

    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    if (!projectId) {
      setLoading(false)
      toast.error("Error", {
        description: "Project not found",
      })
      return
    }
    try {
      const response = await deleteProject(projectId)
      if (response.status === 200) {
        setOpen(false)
        router.refresh()
        toast.success("Success", {
          description: "Project deleted successfully",
        })
      } else {
        toast.error("OOPS!", {
          description: response.error || "Failed to delete project. Please try again later",
        })
        return
      }

    } catch (error) {
      console.log("Error in handleRecover", error)
      toast.error("OOPS!", {
        description: "Something went wrong. Please try again later",
      })

    } finally {
      setLoading(false)
    }

  }


  // const theme = themes.find((theme) => theme.name === themeName) || themes[0]
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${!isDelete && "hover:bg-muted/50"
        }`}
      variants={itemVariants}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        {/* <ThumbnailPreview theme={theme}
        //add the slide dat
        //  slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        /> */}
      </div>
      <div className='w-full'>
        <div className='space-y-1'>
          <h3 className='font-semibold text-base text-primary line-clamp-1'>
            {title}
          </h3>
          <div className='flex w-full justify-between items-center gap-2'>
            <p className='text-sm text-muted-foreground' suppressHydrationWarning>
              {timeAgo(createdAt!)}
            </p>
            {
              isDelete ? (
                <AlertDialogBox
                  description="This wi;; recover the projects and restore it to the dashboard"
                  className={`bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700`}
                  loading={loading}
                  open={open}
                  handleOpen={() => setOpen(!open)}
                  onClick={handleRecover}
                >
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    className='bg-background-80 dark:hover:bg-background-90'
                    disabled={loading}
                  >
                    Recover
                  </Button>
                </AlertDialogBox>
              ) :
                (
                  <AlertDialogBox
                    description="This will delete your project and sent to trash."
                    className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                    loading={loading}
                    open={open}
                    onClick={handleDelete}
                    handleOpen={() => setOpen(!open)}
                  >
                    <Button
                      size={"sm"}
                      variant={"ghost"}
                      className="bg-background/15 dark:hover:bg-background/90"
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </AlertDialogBox>
                )
            }
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard