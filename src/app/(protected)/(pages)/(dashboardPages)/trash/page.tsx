import React from 'react'
import DeleteAllButton from './_components/DeleteAllButton'


const Page = async () => {



  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Trash
          </h1>
          <p className="text-base font-normal dark:text-muted-foreground">
            All your deleted projects
          </p>
        </div>
        <DeleteAllButton Projects={deletedProjects.data} />
      </div>
      {deletedProjects.data.length > 0 ? (
        <Projects projects={deletedProjects.data} />
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default Page