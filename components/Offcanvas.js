import React, { useState } from "react";
import styles from "../scss/offcanvas.module.scss";
import { Button } from "@carbon/react";
import { Close32 } from "@carbon/icons-react";

const Offcanvas = ({ isOpen, children }) => {

    return (
        <div className={styles.offcanvas}>
            <div
                className={styles.overlay}
                onClick={() => isOpen(false)}
            />
            <div className={styles.content}>
                <Button
                    kind="ghost"
                    className={styles.close}
                    onClick={() => isOpen(false)}
                    renderIcon={Close32}
                >close</Button>
                {children}
            </div>
        </div>
    );
}

export default Offcanvas;