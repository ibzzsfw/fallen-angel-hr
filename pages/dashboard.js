import {
  FlexGrid,
  Row,
  Column,
} from '@carbon/react';
import React from 'react';
import styles from '../scss/dashboard/dashboard.module.scss';
import NotificationPanel from '../components/dashboard/Notification-panel';
import Admin from '../components/dashboard/Admin';
import Manager from '../components/dashboard/Manager';

const Dashboard = () => {

  return (
    <FlexGrid fullWidth className={styles.dashboard}>
      <Row className={styles.resetRow}>
        <Column max={12} xlg={10} className={styles.mainCol}>
          <Admin />
          <Manager />
        </Column>
        <Column max={{ span: 3, offset: 1 }} xlg={6} md={8} sm={4} className={styles.notification}>
          <NotificationPanel />
        </Column>
      </Row>
    </FlexGrid >
  )
}

export default Dashboard;

// export const getStaticProps = async () => {

//   const data = [
//     {
//       "group": "2V2N 9KYPM version 1",
//       "value": 20000
//     },
//     {
//       "group": "L22I P66EP L22I P66EP L22I P66EP",
//       "value": 65000
//     },
//     {
//       "group": "JQAI 2M4L1",
//       "value": 75000
//     },
//     {
//       "group": "J9DZ F37AP",
//       "value": 1200
//     },
//     {
//       "group": "YEL48 Q6XK YEL48",
//       "value": 10000
//     },
//     {
//       "group": "Misc",
//       "value": 25000
//     }
//   ]

//   const options = {
//     "title": "Donut (centered)",
//     "resizable": true,
//     "legend": {
//       "alignment": "center"
//     },
//     "donut": {
//       "center": {
//         "label": "Browsers"
//       },
//       "alignment": "center"
//     },
//     "height": "400px"
//   }

//   return {
//     props: {
//       data,
//       options
//     }
//   }
// };