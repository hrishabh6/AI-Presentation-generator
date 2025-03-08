
import { BookTemplate, Home, Settings, Trash } from "lucide-react";

export const data = {
    user : {
        name : "Hrishabh",
        email : "hrishabhjoshi123@gmail.com",
        avatar : "/pfpb.jpg"
    },
    navMain : [
        {
            title : "Home",
            url : "/dashboard",
            icon : Home
        },
        {
            title : "Templates",
            url : "/templates",
            icon : BookTemplate
        },
        {
            title : "Trash",
            url : "/trash",
            icon : Trash
        },
        {
            title : "Settings",
            url : "/settings",
            icon : Settings
        },

    ]
}