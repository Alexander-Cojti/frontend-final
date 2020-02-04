import * as React from "react";
import IconButton from "material-ui/IconButton";
import MuiDialog, { DialogTitle, DialogContent, DialogContentText, DialogProps } from "material-ui/Dialog";
import CloseIcon from "material-ui-icons/Close";
import Typography from "material-ui/Typography";
import { withTheme } from "material-ui/styles";
import { cnc } from "../../../../util";
import { LinkComponent } from './link.component';
const styles = require('./dialog.styles.scss');
const jfkFilesScenario = require('../../../../assets/img/jfk-files-scenario.png');

const Dialog: React.StatelessComponent<DialogProps> = ({ ...props }) => {
  return (
    <MuiDialog {...props} className={cnc(props.className, styles.dialog)} classes={{ paper: styles.content }}>
    
    </MuiDialog>
  );
}

export const DialogComponent = Dialog;
