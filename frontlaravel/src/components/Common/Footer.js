import './styles/Footer.css';

export default function Footer() {
  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <footer className="footer">
      <p>
        Laravel<span>DB</span> &copy; {getCurrentYear()}
      </p>
    </footer>
  );
}
