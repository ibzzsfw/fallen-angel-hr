import {
    Column,
    ContentSwitcher,
    FlexGrid,
    Row,
    Switch,
} from '@carbon/react';
import axios from 'axios';
import { useState } from 'react';
import NewEmployee from '../components/manage/NewEmployee';
import RemoveEmployee from '../components/manage/RemoveEmployee';
import styles from '../scss/manage/manage.module.scss';

const Manage = (props) => {

    const [selectedSwtich, setSelectedSwitch] = useState(1);

    const render = selectedSwtich => {

        let content = <></>;

        switch (selectedSwtich) {
            case 1:
                content = <NewEmployee getRole={props.getRole} getDepartment={props.getDepartment} />
                break;
            case 2:
                content = <RemoveEmployee getDepartment={props.getDepartment} />
                break;
            default:
                content = <NewEmployee getRole={props.getRole} getDepartment={props.getDepartment} />
                break;
        }

        return content;
    }

    return (
        <FlexGrid fullWidth className={styles.manage}>
            <Row>
                <Column max={6} xlg={6} lg={6} md={0} sm={0} className={styles.bg} />
                <Column max={10} xlg={10} lg={10} md={8} sm={4} className={styles.mainCol}>
                    <Row className={styles.topRow}>
                        <ContentSwitcher className={styles['content-switcher']}>
                            <Switch name="one" text="New employee" onClick={() => setSelectedSwitch(1)} />
                            <Switch name="two" text="Remove employee" onClick={() => setSelectedSwitch(2)} />
                        </ContentSwitcher>
                    </Row>
                    <Row className={styles['content-area']}>
                        {render(selectedSwtich)}
                    </Row>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default Manage;


export const getStaticProps = async () => {

    const res1 = await axios.get('http://localhost:3000/api/admin/getRole')
    const getRole = await res1.data;

    const re2 = await axios.get('http://localhost:3000/api/profile/getDepartment');
    const getDepartment = await re2.data;

    return {
        props: {
            getRole,
            getDepartment,
        }
    }
}