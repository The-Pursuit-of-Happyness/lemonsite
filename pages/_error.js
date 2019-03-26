import React from 'react'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <div>
        <p className="liStyle">
        {this.props.statusCode
          ? `服务器错误： ${this.props.statusCode} ，请联系管理员`
          : '客户端错误，请检测访问链接是否有效'}
        </p>
        <style jsx>{`
          .liStyle {
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            text-align:center;
            font-size:20px;
          }
        `}
        </style>
      </div>
      
    )
  }
}
