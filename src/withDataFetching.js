import React from 'react'

export default function withDataFetching(WrappedComponent) {
    class withDataFetching extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: [],
                loading: true,
                error: ''
            }
        }

        async componentDidMount() {
            try {
                const data = await fetch(this.props.dataSource)
                const dataJSON = await data.json()

                if (dataJSON) {
                    this.setState({
                        data: dataJSON,
                        loading: false
                    })
                }
            } catch (e) {
                this.setState({
                    loading: false,
                    error: e.message
                })
            }
        }

        render() {
            const { data, loading, error } = this.state

            return (
                <WrappedComponent
                    data={data}
                    loading={loading}
                    error={error}
                    {...this.props}
                />
            )
        }
    }

    withDataFetching.displayName = `withDataFetching(${WrappedComponent.name})`

    return withDataFetching
}