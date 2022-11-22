import React from "react";
// import { Dialog, Slide } from "@material-ui/core";
import {
    Dialog,
    Slide
} from "@mui/material"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const { children, hideDialogHandler, maxWidth, fullWidth, scrollType,open,style } = props;

    return (
        <Dialog
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            open={open}
            scroll={scrollType ? scrollType : "paper"}
            onClose={hideDialogHandler}
            TransitionComponent={Transition}
            sx={{...style,
            "&.MuiPaper-paper":{
                borderRadius:'24px'
            }
            }}
        >
            {children}
        </Dialog>
    );
}