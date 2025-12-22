import { useContext } from "react"
import { ThemeContext } from "../hooks/useToggle";

export const Confirmation = () => {
    const { theme, changeTheme } = useContext(ThemeContext);
    console.log("current theme here", theme);
    return <>
        <div>
            <p>Thank you for contacting. Current theme is {theme}</p>
            <button onClick={changeTheme}>Switch Theme</button>
        </div>
    </>
}