import { adminRoutes } from '../../Admin/routes';
import { loggedInRoutes } from '../../User/routes';

export const routes = { 
    LoggedIn: [...loggedInRoutes],
    //Admin: [...adminRoutes],
};  

