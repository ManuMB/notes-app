import PropTypes from "prop-types";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

export const NoteCard = ({ note }) => {
  const { id, title, content, active } = note;
  const {
    handlerNoteSelectedForm,
    handlerRemoveNote,
    handlerArchiveNote,
    handlerUnarchiveNote,
  } = useContext(NoteContext);

  return (
    <>
      <div className="card col-lg-5 col-md-4 col-10 m-1">
        <div className="card-body">
          <div className="d-flex flex-column mr-auto">
            <div className="">
              <h4>{title}</h4>
              <p>{content}</p>
            </div>
            <div className="align-self-end justify-content-end">
              {active ? (
                <button
                  type="button"
                  className="btn border-0 p-2"
                  onClick={() => handlerArchiveNote(id)}
                >
                  <i className="fa-solid fa-arrow-turn-down fa-2x"></i>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn border-0 p-2"
                  onClick={() => handlerUnarchiveNote(id)}
                >
                  <i className="fa-solid fa-arrow-turn-up fa-2x"></i>
                </button>
              )}
              <button
                type="button"
                className="btn border-0 p-2"
                onClick={() =>
                  handlerNoteSelectedForm({
                    id,
                    title,
                    content,
                    active,
                  })
                }
              >
                <i className="fa-solid fa-pen fa-2x"></i>
              </button>
              <button
                type="button"
                className="btn p-2"
                onClick={() => handlerRemoveNote(id)}
              >
                <i className="fa-solid fa-close fa-2x"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
};
