import 'antd/dist/antd.css';
import { Alert } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './error-indicator2.css';
import React from 'react';

const ErrorIndicator = () => {
  const icon = <SmileOutlined />;
  const message = (
    <div className="error_indicator">
      <div className="error_message">Ooopsss..</div>
      <div className="error_message">Something is going wrong here</div>
      <div className="error_message">But no worries for that! We are already fixing it :) </div>
    </div>
  );

  return <Alert icon={icon} showIcon message={message} type="error" className="error_message" closable />;
};

export default ErrorIndicator;
