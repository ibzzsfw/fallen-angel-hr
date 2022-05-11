import {
  Tile,
  Button,
  FlexGrid,
  Grid,
  Row,
  Column,
} from '@carbon/react';
import React from 'react';
import Head from 'next/head';
import styles from '../scss/dashboard.module.scss';
import { useThemePreference } from '../components/ThemePreference';
import Notification from '../components/dashboard/Notification';

const Dashboard = () => {

  return (
    <FlexGrid fullWidth condensed className={styles.dashboard}>
      <Row condensed> 
        <Column max={10} xlg={10}>
          <div className={styles.name}>
            <Column lg={16}>
              <h1>Welcome, suppakorn rakna</h1>
            </Column>
          </div>
          <Row className={styles.menu}>
            <Column>
              <div className={styles.composer}>
                <img alt='composer logo' src='https://quantum-computing.ibm.com/_nuxt/img/composer-light.6799b22.svg' />
                <div className={styles.middle}>
                  <div className={styles.intro}>Graphically build circuits with</div>
                  <div className={styles.title}>IBM Quantum Composer</div>
                </div>
                <Button className={styles.button}>Launch Composer</Button>
              </div>
            </Column>
            <Column>
              <Tile />
            </Column>
            <Column>
              <Tile style={{ backgroundColor: 'blue' }} />
            </Column>
            <Column>
              <Tile style={{ backgroundColor: 'yellow' }} />
            </Column >
          </Row >
          <Row className={styles.tiles}>
            <Column className={styles.left}>
              <Row className={styles.row}>
                <Column lg={16}>
                  <Tile style={{ backgroundColor: 'orange' }} />
                </Column>
              </Row >
              <Row>
                <Column lg={16}>
                  <Tile style={{ backgroundColor: 'violet' }} />
                </Column>
              </Row >
            </Column >
            <Column className={styles.right}>
              <Tile style={{ backgroundColor: 'pink', height: '100%' }} />
            </Column>
          </Row >
        </Column >
        <Column max={6} xlg={6} className={styles.notification}>
          <Notification />
        </Column>
      </Row>
    </FlexGrid >
  )
}

export default Dashboard;