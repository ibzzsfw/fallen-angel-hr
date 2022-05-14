import React, { useState } from "react";
import styles from '../../scss/documentRequest/add-bookdoc.module.scss';
import BookDocument from "./BookDocument";
import Offcanvas from "../Offcanvas";
import { AddDocument } from '@carbon/pictograms-react';
import { Button } from '@carbon/react';
import { Add } from '@carbon/react/icons';

const AddBookDoc = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles['add-bookingdoc']}>
            <AddDocument className={styles.AddDocument} />
            <div className={styles.middle}>
                <div className={styles.title}>Booking new document request</div>
            </div>
            <Button        
                renderIcon={!isOpen ? Add : null}
                onClick={() => setIsOpen(true)}
            >
                {!isOpen ? 'Request now' : 'Request...'}    
            </Button>
            {
                isOpen &&
                <Offcanvas isOpen={q => setIsOpen(q)}>
                    <BookDocument />
                </Offcanvas>
            }
        </div>
    )
}

export default AddBookDoc;