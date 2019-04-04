import { Fragment, PureComponent } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

class Training extends PureComponent {
  loadTrainingMoreData() {
    const page = this.props.training.page+1
    this.props.dispatch({ type: 'index/fetchTrainingList', payload: { page } })
  }

  render () {
    console.log(this.props)
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
    ...state.index
  }
})(Training)