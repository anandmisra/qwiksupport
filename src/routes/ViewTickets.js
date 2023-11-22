import { viewTickets, ticketActions } from "../redux/ticket/ticketSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

function ViewTickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  const { reset } = ticketActions;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    } else {
      dispatch(viewTickets());
    }
  }, [tickets]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings" style={{backgroundColor: "Black", border: "2px white solid"}}>
          <div style={{color: "Yellow"}}>Launch Date</div>
          <div style={{color: "Yellow"}}>Category</div>
          <div style={{color: "Yellow"}}>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} style={{backgroundColor: "Black", border: "2px white solid"}}/>
        ))}
      </div>
    </>
  );
}

export default ViewTickets;
