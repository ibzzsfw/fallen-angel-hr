import styles from "../scss/offcanvas.module.scss";

const Offcanvas = ({ isOpen, width, children }) => {

    width = width || 'max';

    return (
        <div className={styles.offcanvas}>
            <div
                className={styles.overlay}
                onClick={() => isOpen(false)}
            />
            <div className={styles.content + ' ' + styles[`${width}`]}>
                {children}
            </div>
        </div>
    );
}

export default Offcanvas;