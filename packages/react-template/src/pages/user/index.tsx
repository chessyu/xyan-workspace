import { Button } from 'antd'
import { useRef, useState } from 'react'

export default function User() {
	const girls = ['林志玲', '迪丽热巴', '杨幂', '唐嫣', '刘诗诗']
	const [current, setCurrent] = useState(0)
	const last = useRef(0)

	return (
		<div>
			<Button
				onClick={() => {
					// 保留上一个女朋友名字
					last.current = current
					setCurrent(() => {
						return current < girls.length - 1 ? current + 1 : 0
					})
				}}
			>
				一个星期后
			</Button>
			<br />
			<br />
			<p>{`陆建对现在的女朋友 ”${girls[current]}“ 说，我上一个女朋友是 "${
				girls[last.current]
			}"`}</p>
		</div>
	)
}
