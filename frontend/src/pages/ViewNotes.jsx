import PropTypes from "prop-types";
import { NoteCard } from "../components/NoteCard";
import { useContext, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";
import { NoteModalForm } from "../components/NoteModalForm";

export const ViewNotes = ({ actives }) => {
  const {
    notes,
    visibleForm,
    handlerOpenForm,
    getNotesActive,
    getNotesArchive,
  } = useContext(NoteContext);

  useEffect(() => {
    if (actives) {
      getNotesActive();
    } else {
      getNotesArchive();
    }
  }, [actives]);

  return (
    <>
      {!visibleForm || <NoteModalForm />}
      <div className="mx-5 mt-3 p-1">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="display-4 active text-lg" aria-current="page">
              {actives ? "Active notes" : "Archived notes"}
            </li>
          </ol>
        </nav>
      </div>

      <div className="row justify-content-start ps-5 my-4 w-100">
        {notes.length === 0 ? (
          <h2>You have no notes</h2>
        ) : (
          notes.map((note) => <NoteCard key={note.id} note={note} />)
        )}
      </div>
    </>
  );
};

ViewNotes.propTypes = {
  actives: PropTypes.bool,
};
