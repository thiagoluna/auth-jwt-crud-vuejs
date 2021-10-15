import Home from '../pages/Home'
import User from '../pages/User'
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const routes = [
    {
        path: '/',
        component: () => import('../layout/AuthTemplate'),
        children: [
            {path: '/', component: Login, name: 'login'},
            {path: '/register', component: Register, name: 'register'},
        ]
    },

    {
        path: '/', component: () => import('../layout/DefaultTemplate'),
        children: [
            {path: '/home', component: Home, name: 'home', meta: {logged: true}},
            {path: '/users', component: User, name: 'users', meta: {logged: true}}
        ]
    },
]

export default routes