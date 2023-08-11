import { Column, Row } from '@carbon/react';
import styles from '../scss/banner.module.scss';

const Banner = ({ heading, p, tabs }) => {

    return (
        <Row className={styles.banner + ' ' + (tabs && styles.tabs)}>
            <Column lg={16}>
                <h1 className={styles.heading}>{heading}</h1>
                <p className={styles.p}>{p}</p>
            </Column>
        </Row>
    );
}

export default Banner;