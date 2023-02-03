import { 
    EuiHeader,
    EuiText,
    EuiTextColor,
    EuiFlexGroup,
    EuiFlexItem,
    EuiButtonIcon,
} from "@elastic/eui";
import { signOut } from "firebase/auth";
import React, {useState, useEffect} from "react"
import { useDispatch } from "react-redux";
import {
    useNavigate,
    useLocation,
    Link,
} from "react-router-dom"
import { useAppSelector } from "../app/hooks";
import { changeTheme } from "../app/slices/AuthSlice";
import { firebaseAuth } from "../utils/FirebaseConfig";

function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const username = useAppSelector((zoom)=>zoom.auth.userInfo?.name);
    const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme)

    const [breadCrumbs, setBreadCrumbs] = useState([{ text: "Dashboard"}])
    const [isResponsive, setIsResponsive] = useState(false)
    const dispatch = useDispatch();
    const logout = () => {
        signOut(firebaseAuth);
    };

    const invertTheme = () => {
        const theme = localStorage.getItem("zoom-theme")
        localStorage.setItem("zoom-theme", theme==="light"?"dark":"light")
        dispatch(changeTheme({isDarkTheme:!isDarkTheme}))
    }

    const section = [{
        items: [
            <Link to="/">
                <EuiText>
                    <h2 style={{padding:"0 1vw"}}>
                        <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
                    </h2>
                </EuiText>
            </Link>
        ]
    },
    {
        items:[
            <>
                {username? (
                    <EuiText>
                        <h3>
                            <EuiTextColor color="white">Hello, </EuiTextColor>
                            <EuiTextColor color="#0b5cff">{username}</EuiTextColor>
                        </h3>
                    </EuiText>
                ):null
                }
            </>
        ]
    },
    {
        items:[
            <EuiFlexGroup
                justifyContent="center"
                alignItems="center"
                direction="row"
                style={{gap:"2vw"}}
            >
                
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    {
                    isDarkTheme ? (
                    <EuiButtonIcon
                        onClick={invertTheme}
                        iconType="sun"
                        display="fill"
                        size="s" 
                        color="warning"
                        aria-label="invert-theme-button"
                    />
                    ):(                    
                    <EuiButtonIcon
                        onClick={invertTheme}
                        iconType="moon"
                        display="fill"
                        size="s"
                        color="ghost"
                        aria-label="invert-theme-button"
                    />                    
                )}
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    <EuiButtonIcon
                        onClick={logout}
                        iconType="lock"
                        display="fill"
                        size="s"
                        aria-label="logout-button"
                    />
                </EuiFlexItem>

            </EuiFlexGroup>
        ]
    },
];

    const responsiveSection = [{
        items: [
            <Link to="/">
                <EuiText>
                    <h2 style={{padding:"0 1vw"}}>
                        <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
                    </h2>
                </EuiText>
            </Link>
        ]
    },

];

    useEffect(()=>{
        if(window.innerWidth<480) setIsResponsive(true);
    }, []);

    return (<>

    <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections= {isResponsive ? responsiveSection : section}
    />

    <EuiHeader 
        style={{minHeight: "8vh"}}
        sections={[{ breadcrumbs: breadCrumbs }]}
    />


    
    </>);
}

export default Header;