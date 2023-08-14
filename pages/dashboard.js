import {
  Column,
  FlexGrid,
  Row,
} from '@carbon/react';
import axios from 'axios';
import Admin from '../components/dashboard/Admin';
import Manager from '../components/dashboard/Manager';
import NotificationPanel from '../components/dashboard/Notification-panel';
import styles from '../scss/dashboard/dashboard.module.scss';

const Dashboard = (props) => {
  return (
    <FlexGrid fullWidth className={styles.dashboard}>
      <Row className={styles.resetRow}>
        <Column max={12} xlg={10} className={styles.mainCol}>
          <Admin
            getStatusCount={props.getStatusCount}
            getHeadCount={props.getHeadCount}
            getPositionCount={props.getPositionCount}
            getDepartmentCount={props.getDepartmentCount}
            getSalaryCount={props.getSalaryCount}
            getSex={props.getSex}
          />
          <Manager />
        </Column>
        <Column max={{ span: 3, offset: 1 }} xlg={6} md={8} sm={4} className={styles.notification}>
          <NotificationPanel getNotification={props.getNotification} />
        </Column>
      </Row>
    </FlexGrid >
  )
}

export default Dashboard;

export const getStaticProps = async () => {

  const res1 = await axios.get('http://localhost:3000/api/dashboard/getStatusCount')
  const getStatusCount = await res1.data;

  const res2 = await axios.get('http://localhost:3000/api/dashboard/getHeadCount')
  const getHeadCount = await res2.data;

  const res3 = await axios.get('http://localhost:3000/api/dashboard/getPositionCount')
  const getPositionCount = await res3.data;

  const res4 = await axios.get('http://localhost:3000/api/dashboard/getDepartmentCount')
  const getDepartmentCount = await res4.data;

  const res5 = await axios.get('http://localhost:3000/api/dashboard/getSalaryCount')
  const getSalaryCount = await res5.data;

  const res6 = await axios.get('http://localhost:3000/api/notification/getNotification', {
    headers: {
      status: 'approved'
    }
  })
  const getNotification = await res6.data;

  const res7 = await axios.get('http://localhost:3000/api/dashboard/getSex')
  const getSex = await res7.data;

  return {
    props: {
      getStatusCount,
      getHeadCount,
      getPositionCount,
      getDepartmentCount,
      getSalaryCount,
      getNotification,
      getSex
    }
  }
}
