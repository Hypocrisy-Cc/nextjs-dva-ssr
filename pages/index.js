import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import Link from 'next/link'
import TrainingComponent from '../components/training'

class Index extends PureComponent {
  static async getInitialProps (props) {
    const {dvaStore} = props
    const { dispatch } = dvaStore
    await Index.initState({dispatch})
    return {}
  }

  componentDidMount () {
    console.log(this.props)
    const { dispatch } = this.props
    Index.initState({dispatch})
  }

  static async initState ({dispatch}) {
    return new Promise((async resolve => {
      console.log(1)
      await dispatch({type: 'home/fetchTrainingList', payload: {page: 1}})
      console.log(2)
      await dispatch({type: 'home/fetchActivityList', payload: {page: 1}})
      console.log(3)
      resolve()
    }))
  }

  loadActivityMoreData () {
    const page = this.props.home.activity.page + 1
    this.props.dispatch({type: 'home/fetchActivityList', payload: {page}})
  }

  render () {
    return (
      <Fragment>
        <Link href="/login"><a>登录页面</a></Link>
        {
          this.props.home.activity.dataset.map(
            (item, index) => <p key={index}>活动名称：{item.subject}</p>)
        }

        {
          this.props.home.activity.more
            ?
            <Button type="primary"
                    onClick={() => this.loadActivityMoreData()}>服务端渲染</Button>
            : '没有更多数据'
        }
        <div><TrainingComponent/></div>
      </Fragment>
    )
  }
}

export default connect(state => {
  return {
    app: state.app,
    home: state.home,
  }
})(Index)
