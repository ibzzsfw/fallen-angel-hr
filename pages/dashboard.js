import {
  Tile,
  FlexGrid,
  Row,
  Column,
} from '@carbon/react';
import React from 'react';
import styles from '../scss/dashboard.module.scss';
import NotificationPanel from '../components/dashboard/Notification-panel';
// import { DonutChart } from "@carbon/charts-react";
// import "@carbon/charts/styles.css";
// import "../scss/plex-and-carbon-components.module.css";

const Dashboard = () => {

  const dataCount = [1, 2, 3, 4, 5].map(i => {
    return {
      "group": `Position ${i}`,
      "value": Math.random() * 10
    }
  })

  const optionsCount = {
    "title": "Employee count by position",
    "resizable": true,
    "legend": {
      "alignment": "center"
    },
    "donut": {
      "center": {
        "label": "Employees"
      },
      "alignment": "center"
    },
    "height": "350px"
  }

  const dataPro = [
    {
      "group": `Attend`,
      "value": 29
    },
    {
      "group": `Absent`,
      "value": 4
    }
  ]

  const optionsPro = {
    "title": "Employee count by status",
    "resizable": true,
    "legend": {
      "alignment": "center"
    },
    "donut": {
      "center": {
        "label": "Employees"
      },
      "alignment": "center"
    },
    "height": "350px"
  }

  return (
    <FlexGrid fullWidth className={styles.dashboard}>
      <Row className={styles.resetRow}>
        <Column max={12} xlg={10} className={styles.mainCol}>
          <Row>
            <Column max={6}>
              <Row>
                <h1>Department: <span>Accounting</span></h1>
              </Row>
              <Row>
                <Column>
                  <Tile />
                </Column>
                <Column>
                  <Tile />
                </Column>
              </Row>
              <Row>
                <Column>
                  <Tile />
                </Column>
                <Column>
                  <Tile />
                </Column>
              </Row>
            </Column>
            <Column max={5}>
              <Tile>
                <DonutChart
                  data={dataPro}
                  options={optionsPro}>
                </DonutChart>
              </Tile>
            </Column>
            <Column max={5}>
              <Tile>
                <DonutChart
                  data={dataCount}
                  options={optionsCount}>
                </DonutChart>
              </Tile>
            </Column>
          </Row>
          <Row>
            <Tile />
          </Row>
          <Row>
            <Tile />
          </Row>
        </Column >
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