import * as AuthenticationContext from "adal-angular";
import AdalConfig from "./AdalConfig";


window.Logging.log = function(message) {
  console.log(message);
};
window.Logging.level = 2;

export default new AuthenticationContext(AdalConfig);
