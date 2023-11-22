import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../redux/ticket/ticketSlice";
import {
  getNotes,
  createNote,
  reset as notesReset,
} from "../redux/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
    backgroundColor: "Black",
    border: "3px solid LightBlue",
    borderBottomLeftRadius: "25px",
    borderBottomRightRadius: "25px",
    borderTopLeftRadius: "25px",
    borderTopRightRadius: "25px"
  },
};

Modal.setAppElement("#root");

function ViewTicket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading) {
    return <Spinner />;
  }

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <>
      {isSuccess && (
        <div className="ticket-page" style={{backgroundColor: "Black"}}>
          <header className="ticket-header" style={{backgroundColor: "Black"}}>
            <BackButton url="/tickets" />
            <h2>
              ID: {ticket._id}
              <span className={`status status-${ticket.status}`}>
                {ticket.status}
              </span>
            </h2>
            <h4>
              Date Launched:{" "}
              {new Date(ticket.createdAt).toLocaleString("en-US")}
            </h4>
            <h4>Category: {ticket.product}</h4>
            <hr />
            <div className="ticket-desc" style={{backgroundColor: "Black"}}>
              <h3>Description of Issue</h3>
              <p>{ticket.description}</p>
            </div>
            <h2>Messages</h2>
          </header>

          {ticket.status !== "closed" && (
            <button onClick={openModal} className="btn">
              <FaPlus /> Send a message
            </button>
          )}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Add Note"
          >
            <h2>Type your message</h2>
            <button className="btn-close" onClick={closeModal}>
              X
            </button>
            <form onSubmit={onNoteSubmit}>
              <div className="form-group">
                <textarea
                  name="noteText"
                  id="noteText"
                  className="form-control"
                  placeholder="Describe futher deatils"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <button className="ctb" type="submit">
                  Send
                </button>
              </div>
            </form>
          </Modal>

          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}

          {ticket.status !== "closed" && (
            <button
              onClick={onTicketClose}
              className="cti"
            >
              Close Ticket
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default ViewTicket;
