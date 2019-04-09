import { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import TrainingComponent from '../components/training'

class Index extends PureComponent {
  static async getInitialProps (props) {
    await props.dvaStore.dispatch({type: 'home/fetchTrainingList'})
    await props.dvaStore.dispatch({type: 'home/fetchActivityList'})
    return {}
  }

  loadActivityMoreData () {
    const page = this.props.activity.page + 1
    this.props.dispatch({type: 'home/fetchActivityList', payload: {page}})
  }

  render () {
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