import { adminRoutes } from '../../Admin/routes';
import { loggedInRoutes } from '../../User/LoggedIn/routes';

export const routes = { 
    LoggedIn: [...loggedInRoutes],
    //Admin: [...adminRoutes],
};  

