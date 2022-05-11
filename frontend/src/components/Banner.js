import React from 'react';
import {
    Row,
    Column,
    Toggle,
} from '@carbon/react';
import { useThemePreference } from '../components/ThemePreference'
import styles from '../../src/scss/banner.module.scss';

const Banner = ({ heading, p, tabs }) => {

    const { theme, setTheme } = useThemePreference();

    return (
        <Row className={styles.banner + ' ' + (tabs && styles.tabs)}>
            <Column lg={16}>
                <h1 className={styles.heading}>{heading}</h1>
                <p className={styles.p}>{p}</p>
                <Toggle
                    onToggle={() => {
                        if (theme === 'g10') {
                            setTheme('g100');
                        }
                        if (theme === 'g100') {
                            setTheme('g10');
                        }
                    }}
                    labelA="Light"
                    labelB="Dark"
                    id="toggle-1"
                />
            </Column>
        </Row>
    );
}

export default Banner;