import React from "react";
import {
    FlexGrid,
    Row,
    Column,
    Tile,
    Button,
    Stack
} from "@carbon/react";
import { Edit } from "@carbon/icons-react";
import styles from "../scss/profile.module.scss";

const Profile = () => {

    const category = (cat) => {

        let title = cat.title;
        let edit = cat.edit;
        let arr = cat.arr;
        let modal = cat.modal;

        return (
            <div className={styles.category}>
                <Tile className={styles.topic}>
                    <div className={styles.header}>
                        <div>{title}</div>
                        {
                            edit &&
                            <Button
                                kind='ghost'
                                size='sm'
                                renderIcon={Edit}
                            >
                                Edit
                            </Button>
                        }
                    </div>
                </Tile>
                <Tile>
                    <Stack gap='24px' className={styles.content}>
                        {
                            arr.map((item, index) => {

                                return (
                                    <div className={styles.wraper} key={index}>
                                        <div className={styles.title}>{item.key}</div>
                                        <div className={styles.value}>{item.value}</div>
                                    </div>
                                )
                            })
                        }
                    </Stack>
                </Tile>
            </div>
        )
    }

    return (
        <FlexGrid fullWidth className={styles.profile}>
            <Row>
                <Column max={4}>
                    <Tile />
                </Column>
                <Column max={{ span: 11, offset: 1 }}>
                    <Stack gap='32px' className={styles.stack}>
                        {
                            profile.map(cat => category(cat))
                        }
                    </Stack>
                </Column>
            </Row>
        </FlexGrid>
    );
}

export default Profile;

// photo
// personal
// work
// contact and address
//bank
// password

const profile = [
    {
        title: 'Personal information',
        edit: true,
        arr: [
            { key: 'Name', value: 'John Doe' },
            { key: 'Identification No.', value: '1110100111293' },
            { key: 'Date of birth', value: '01/01/1990' },
            { key: 'Physical gender', value: 'Male' }
        ],
        modal: null
    },
    {
        title: 'Work information',
        edit: false,
        arr: [
            { key: 'Role', value: 'Employee' },
            { key: 'Employee ID', value: '0e38af30-7a6a-4201-9584-42264f2684fc' }
        ],
        modal: null
    },
    {
        title: 'Contact and address',
        edit: true,
        arr: [
            { key: 'Email', value: 'example@angel.com' },
            { key: 'Phone', value: '(+66)954205601' },
            { key: 'Address', value: '123/123, Bangkok, Thailand' }
        ],
        modal: null
    },
    {
        title: 'Bank information',
        edit: true,
        arr: [
            { key: 'Bank name', value: 'Kasikornbank' },
            { key: 'Bank account number', value: '123456789012345678' }
        ],
        modal: null
    },
    {
        title: 'Password',
        edit: true,
        arr: [
            { key: 'Password', value: '********' }
        ],
        modal: null
    }
]