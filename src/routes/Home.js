import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  return (
    <div className="home">
      <section className="heading">
        <h1>Welcome to QwikSupport!</h1>
        <p>If you have any questions, issues, or need assistance with QwickLabs online labs learning platform, you're in the right place. Our support team is here to help you!</p>
        <h3>How can we assist you today?</h3>
      </section>
      <div className="header-items">
        <Link to="/new-ticket" className="ct">
          Raise New Ticket
        </Link>

        <Link to="/tickets" className="ct">
          Previous Tickets
        </Link>
      </div>
    </div>
  );
}

export default Home;
