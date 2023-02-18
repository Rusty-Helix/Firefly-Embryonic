import { NavigateFunction } from "react-router-dom";
import { BreadCrumbsType } from "./Types";


export const getCreateMeetingBreadCrumbs = (
    navigate: NavigateFunction
) :Array<BreadCrumbsType> => [
    {
        text: "Dashboard",
        href: "#",
        onClick: () => {
            navigate("/");
        },
    },{
        text:"Create a Meeting",
    },
];

export const getOneOnOneMeetingsBreadCrumbs=(
    navigate: NavigateFunction
    ) :Array<BreadCrumbsType> => [
    {
        text: "Dashboard",
        href: "#",
        onClick: () => {
            navigate("/");
        },
    },{
        text:"Create a Meeting",
        href: "#",
        onClick: () => {
            navigate("/create");
        },
    },{
        text: "Create an One-on-one Meeting."
    }
    ];

export const getVideoConferenceBreadCrumbs =(
    navigate: NavigateFunction
    ) :Array<BreadCrumbsType> => [
    {
        text: "Dashboard",
        href: "#",
        onClick: () => {
            navigate("/");
        },
    },{
        text:"Create a Meeting",
        href: "#",
        onClick: () => {
            navigate("/create");
        },
    },{
        text: "Create a Video Conference",
    }
    ];

export const getManageMeetingsBreadCrumbs =(
    navigate: NavigateFunction
    ) :Array<BreadCrumbsType> => [
    {
        text: "Dashboard",
        href: "#",
        onClick: () => {
            navigate("/");
        },
    },{
        text: "Manage Meetings",
    }
    ];

export const getScheduledMeetingsBreadCrumbs =(
    navigate: NavigateFunction
    ) :Array<BreadCrumbsType> => [
    {
        text: "Dashboard",
        href: "#",
        onClick: () => {
            navigate("/");
        },
    },{
        text: "Scheduled Meetings",
    }
    ];