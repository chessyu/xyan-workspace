import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'

export interface IRouteItemTypes {
	path: string
	Component: React.LazyExoticComponent<() => JSX.Element> | unknown
	redirect?: string
	children?: Array<IRouteItemTypes>
}

export const routerItems: IRouteItemTypes[] = [
	{
		path: '/',
		Component: lazy(() => import(/* webpackChunkName: "root" */ '@pages/root')),
		redirect: '/home',
		children: [
			{
				path: '/home',
				redirect: '/home/user',
				Component: lazy(
					() => import(/* webpackChunkName: "home" */ '@pages/home')
				),
				children: [
					{
						path: '/home/user',
						Component: lazy(
							() => import(/* webpackChunkName: "user" */ '@pages/user')
						)
					}
				]
			},
			{
				path: '/login',
				Component: lazy(
					() => import(/* webpackChunkName: "login" */ '@pages/login')
				)
			}
		]
	},
	{
		path: '*',
		Component: lazy(
			() => import(/* webpackChunkName: "404" */ '@pages/result/404')
		)
	}
]
