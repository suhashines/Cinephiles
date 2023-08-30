import { useEffect, useRef, useState } from "react";
import { DropDown } from "./DropDown";

const MenuItems = ({items, depth}) => {
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();

    useEffect(() => {
        
    }, [dropdown]);
    return(
        <li>
            <a href={items.url}>
                {items.title}
            </a>
            {items.submenu && <DropDown submenu={items.submenu} depth={depth} />}
        </li>
    )
}