import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, ticketActions } from "../redux/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const { reset } = ticketActions;
function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message, ticket } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    } else if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }
  }, [ticket]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>No worries when QwikSupport is there!</h1>
        <p>We will reach out to you within 48 hours</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Learner Name</label>
          <input type="text" className="form-control" style={{color: "Yellow", fontSize: "15px"}} value={name} disabled/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Learner Email</label>
          <input type="text" className="form-control" style={{color: "Yellow", fontSize: "15px"}} value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Problem</label>
            <select style={{color: "Yellow", fontSize: "15px"}}
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="start">Issue with starting the lab</option>
              <option value="progress">Issue with progress in the lab</option>
              <option value="checkpoint">Issue with checkpoints not acknowledging the progress</option>
              <option value="end">Issue with ending the lab</option>
              <option value="general">Any other queries</option>
              <option value="bug">Encountered bugs</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Describe the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Mention Lab-ID if required"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{color: "Yellow", fontSize: "15px"}}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="ct signin">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
