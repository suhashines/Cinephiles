import { MenuItems } from "./MenuItems";

const DropDown = ({submens, dropdown, depth}) => {
    depth = depth + 1;

    return(
        <ul>
            {
                submens.map((submenu, index) => {
                    <MenuItems 
                        items={submenu} 
                        key={index} 
                        depth={depth}
                    />
                })
            }            
        </ul>
    )
}

export default DropDown;