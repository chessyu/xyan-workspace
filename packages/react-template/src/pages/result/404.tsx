import { Button, Result } from 'antd'

export default function Page404() {
	const back = () => {
		history.go(-1)
	}
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button type="primary" onClick={back}>
					Back Home
				</Button>
			}
		/>
	)
}
