import * as React from "react";
import Button, { ButtonProps } from "material-ui/Button";
import { withTheme, WithTheme } from "material-ui/styles";
import AddIcon from "material-ui-icons/Add";
import Hidden, { HiddenProps } from "material-ui/Hidden";
const styles = require('./azure-button.style.scss');
const azureLogo = require('../../../../assets/svg/azure-search.logo.svg');

const azureButtonFor = (hiddenProps: HiddenProps): React.StatelessComponent<ButtonProps> => (props) => {
  return (
    <Hidden >
      <img></img>
    </Hidden>
  );
};

const AzureButtonForDesktop = azureButtonFor({ xsDown: true });
const AzureButtonForMobile = azureButtonFor({ smUp: true });

export const AzureButtonComponent: React.StatelessComponent<ButtonProps> = (props) => {
  return (
    <>
      <AzureButtonForDesktop {...props} />
      <AzureButtonForMobile {...props} />
    </>
  );
};
