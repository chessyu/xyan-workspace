import './index.less'
import 'normalize.css'
import { createRoot } from 'react-dom/client'
import { PageView } from '@src/routes'
import React from 'react'

const root = createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<PageView />
	</React.StrictMode>
)
