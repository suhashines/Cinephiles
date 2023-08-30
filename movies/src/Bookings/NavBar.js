import { MenuItems } from "./MenuItems";
import { MenuItems } from "../menuItems";

const NavBar = () => {
    <nav>
        <ul>
            {MenuItems.map((item, index) => {
                const depth = 0;
                return (
                    <MenuItems 
                        items={item} 
                        key={index} 
                        depth={depth}
                    />
                )
            })}
        </ul>
    </nav>
}

export default NavBar;