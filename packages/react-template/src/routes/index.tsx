import { Suspense } from 'react'
import { routerItems } from '../router'

// 引入
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

// loading页面
const Loading = () => (
	<>
		<div className="loadsvg">
			<div>loading...</div>
		</div>
	</>
)
// 递归函数
const rotuerViews = routerItems => {
	if (routerItems && routerItems.length) {
		return routerItems.map(({ path, Component, children, redirect }) => {
			return children && children.length ? (
				<Route
					path={path}
					key={path}
					element={
						<Suspense fallback={<Loading />}>
							<Component />
						</Suspense>
					}
				>
					{rotuerViews(children)} {/*  递归遍历子路由 */}
					{/* {redirect?
              (<Route path={path} element={<Navigate to={redirect} />}></Route>):
              (<Route path={path} element={<Navigate to={children[0].path} />}></Route>)
            } */}
					{redirect && (
						<Route path={path} element={<Navigate to={redirect} />}></Route>
					)}
				</Route>
			) : (
				<Route
					key={path}
					path={path}
					element={
						<Suspense fallback={<Loading />}>
							<Component />
						</Suspense>
					}
				></Route>
			)
		})
	}
}

export const PageView = () => {
	return (
		<HashRouter>
			<Routes>{rotuerViews(routerItems)}</Routes>
		</HashRouter>
	)
}
