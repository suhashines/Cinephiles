import { ButtonBase } from "@mui/material";

const ImageButton = ({ onClick, src, alt }) => {
    return (
        <ButtonBase
            component="button"
            onClick={onClick}
            style={{
                display: 'block', // Ensures the img behaves like a block element
                padding: '0',     // Remove default padding
                border: 'none',   // Remove default border
                outline: 'none',  // Remove focus outline
                cursor: 'pointer', // Show pointer cursor on hover
            }}
        >
            <img src={src} alt={alt} style={{ width: '100%', height: '100%', margin: 'auto' }} />
        </ButtonBase>
    );
};
export default ImageButton;