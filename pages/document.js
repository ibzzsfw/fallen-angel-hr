import React from "react";
import styles from '../scss/documentRequest/document.module.scss';
import { 
    FlexGrid,
    Row,
    Column,
    Tile,
    Stack,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel
} from "@carbon/react";
import AddBookDoc from "../components/documentRequest/AddBookingDoc";
import DocSummary from "../components/documentRequest/DocSummary";
import DocStatus from "../components/documentRequest/DocStatus";
import stylesBanner from '../scss/banner.module.scss';
import axios from "axios";

const Document = (props) => {
    console.log(props)
    return (
        <FlexGrid fullWidth className={styles.document}>
            <Row className={stylesBanner.banner}>
                <Column lg={16}>
                    <h1 className={stylesBanner.heading}>{'Document request'}</h1>
                    <p className={stylesBanner.p}>{'Self-Requesting documents'}</p>
                </Column>
            </Row>
            <Row>
                <Column >
                    <Tabs aria-label="Tab navigation">
                        <TabList scrollIntoView style={{ justifyContent: 'flex-end' }}>
                            <Tab >Summary</Tab>
                            <Tab >Booking status</Tab>
                        </TabList>
                        <TabPanels className={styles['tab-content']}>
                            <TabPanel>
                                <Row className={styles.mainRow}>
                                    <Column max={5} className={styles.left}>
                                        <Stack gap='32px' className={styles.stack}>
                                            <AddBookDoc />
                                            <DocSummary />
                                        </Stack>
                                    </Column>
                                </Row>
                            </TabPanel>
                            <TabPanel>
                                <DocStatus getDocBookingStatus = {props.getDocBookingStatus} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default Document;

export const getStaticProps = async () => {
       
    const res = await axios.get('http://localhost:3000/api/document/getDocBookingStatus')
    const getDocBookingStatus = await res.data;

    const res1 = await axios.get('http://localhost:3000/api/document/getDocumentSummary')
    const getDocumentSummary = await res1.data;


    return {
        props: {
            getDocBookingStatus: getDocBookingStatus,
            getDocumentSummary: getDocumentSummary,
        },
    }
} 