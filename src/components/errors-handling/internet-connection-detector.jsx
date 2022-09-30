import { Offline } from 'react-detect-offline';
import { Alert } from 'antd';

const InternetConnectionDetector = () => (
  <Offline>
    <Alert message="Please check your Internet Connection" type="error" />
  </Offline>
);

export default InternetConnectionDetector;
