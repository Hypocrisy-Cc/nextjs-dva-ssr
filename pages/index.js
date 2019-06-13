import { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import TrainingComponent from '../components/training'

class Index extends PureComponent {
  static async getInitialProps (props) {
    const startTime = +(new Date().getTime() / 1000)
    console.log(`startTime: ${startTime}`)
    await props.dvaStore.dispatch({type: 'home/fetchTrainingList'})
    console.log(`finishedRequest: ${+(new Date().getTime() / 1000)}`)
    await props.dvaStore.dispatch({type: 'home/fetchActivityList'})
    const endTime = +(new Date().getTime() / 1000)
    console.log(`endTime: ${endTime}`)
    console.log(`requestTime: ${endTime - startTime}`)
    return {}
  }

  componentDidMount () {
    console.log(this.props)
    console.log(22222222)
  }

  loadActivityMoreData () {
    const page = this.props.activity.page + 1
    this.props.dispatch({type: 'home/fetchActivityList', payload: {page}})
  }

  render () {
    console.log(process.env.NODE_ENV)
    console.log(`renderTime: ${+(new Date().getTime() / 1000)}`)
    return (
      <Fragment>
        {
          this.props.activity.dataset.map(
            (item, index) => <p key={index}>活动名称：{item.subject}</p>)
        }

        {
          this.props.activity.more
            ?
            <Button type="primary"
                    onClick={() => this.loadActivityMoreData()}>服务端渲染</Button>
            : '没有更多数据'
        }
        <TrainingComponent />
      </Fragment>
    )
  }
}

export default connect(state => {
  return {
    ...state.home
  }
})(Index)
