import styles from './Contact.module.css';

export function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact us</h1>
      <p className={styles.lead}>
        Have questions about our courses or want to enrol? Get in touch.
      </p>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Write2Win</h2>
        <p className={styles.info}>
          Email: nidhi@write2win.com.sg<br />
          Phone: +65 8198 6511<br />
          Address: #07-301, Block 641C Punggol Drive, Singapore 823641
        </p>
        <div className={styles.buttons}>
          <a href="mailto:nidhi@write2win.com.sg" className={styles.primaryButton}>
            Send email
          </a>
          <a href="tel:+6581986511" className={styles.secondaryButton}>
            Call +65 8198 6511
          </a>
        </div>
      </div>
    </div>
  );
}
