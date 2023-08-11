import {
    Column,
    FlexGrid,
    Row,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@carbon/react";
import axios from "axios";
import AddBookDoc from "../components/documentRequest/AddBookingDoc";
import DocStatus from "../components/documentRequest/DocStatus";
import DocSummary from "../components/documentRequest/DocSummary";
import stylesBanner from '../scss/banner.module.scss';
import styles from '../scss/documentRequest/document.module.scss';

const Document = (props) => {
    return (
        <FlexGrid fullWidth className={styles.document}>
            <Row className={stylesBanner.banner + ' ' + stylesBanner.tabs}>
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
                                    <Column max={{ offset: 2 }}>
                                        <AddBookDoc getDocument={props.getDocument} />
                                    </Column>
                                    <Column max={{ span: 8, offset: 2 }}>
                                        <DocSummary />
                                    </Column>
                                </Row>
                            </TabPanel>
                            <TabPanel>
                                <DocStatus getDocBookingStatus={props.getDocBookingStatus} />
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

    const res = await axios.get(`http://localhost:3000/api/document/getDocBookingStatus`)
    const getDocBookingStatus = await res.data;

    const res1 = await axios.get(`http://localhost:3000/api/document/getDocumentSummary`)
    const getDocumentSummary = await res1.data;

    const res2 = await axios.get(`http://localhost:3000/api/document/getDocument`)
    const getDocument = await res2.data


    return {
        props: {
            getDocBookingStatus: getDocBookingStatus,
            getDocumentSummary: getDocumentSummary,
            getDocument: getDocument
        },
    }
} 
