import { Auth } from "../../utils/constant";
import { JwksClient } from "./jwks";

export { isAuthenticated } from "./middlewares/is-authenticated";

export default new JwksClient(Auth.jwksUrl);
