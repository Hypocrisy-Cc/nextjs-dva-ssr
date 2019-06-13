import { Fragment, PureComponent } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

class Training extends PureComponent {
  componentDidMount () {
    console.log(33333)
  }

  loadTrainingMoreData() {
    const page = this.props.training.page+1
    this.props.dispatch({ type: 'home/fetchTrainingList', payload: { page } })
  }

  render () {
    return (
      <Fragment>
        {
          this.props.training.dataset.map((item, index) => <p key={index}>培训名称：{item.name}</p>)
        }
        {
          this.props.training.more
          ?
            <Button type="primary" onClick={() => this.loadTrainingMoreData()}>加载更多</Button>
          : '没有更多数据'
        }
      </Fragment>
    )
  }
}

export default connect(state => {
  return {
    ...state.home
  }
})(Training)
